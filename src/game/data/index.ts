import { OptionalKeysOf } from "type-fest";
import { computed } from "vue";

import * as rawMultipliers from "./multipliers";
export { rawMultipliers };
export type multiplierId = keyof typeof rawMultipliers;
export const multiplierIds = Object.keys(rawMultipliers) as multiplierId[];

import * as rawJobs from "./jobs";
export { rawJobs };
export type jobId = keyof typeof rawJobs;
export const jobIds = vsort(Object.keys(rawJobs) as jobId[], (jobId) => [
	rawCategories[rawJobs[jobId].category].type,
	rawCategories[rawJobs[jobId].category].order,
	rawJobs[jobId].order ?? 999,
]);

import * as rawSkills from "./skills";
export { rawSkills };
export type skillId = keyof typeof rawSkills;
export const skillIds = vsort(
	Object.keys(rawSkills) as skillId[],
	(skillId) => [
		rawCategories[rawSkills[skillId].category].type,
		rawCategories[rawSkills[skillId].category].order,
		rawSkills[skillId].order ?? 999,
	]
);

import * as rawCategories from "./categories";
import { Character } from "../character";
import { reactive, unref } from "vue";
import { defineValue, KMBTFormat, lv, propertyComparator, vsort } from "../lib";
export type categoryId = keyof typeof rawCategories;
export const categoryIds = vsort(
	Object.keys(rawCategories) as categoryId[],
	(cat) => [rawCategories[cat].type, rawCategories[cat].order]
);
type filteredCategoryIds<Q> = keyof {
	[K in categoryId as typeof rawCategories[K] extends { type: Q }
		? K
		: never]: true;
};
export type jobCategoryId = filteredCategoryIds<"jobs">;
export const jobCategoryIds = categoryIds.filter(
	(e) => rawCategories[e].type == "jobs"
) as jobCategoryId[];
export type skillCategoryId = filteredCategoryIds<"skills">;
export const skillCategoryIds = categoryIds.filter(
	(e) => rawCategories[e].type == "skills"
) as skillCategoryId[];

export class Multiplier {
	id: multiplierId;
	name: displayedName;
	desc: displayedDesc;

	producers: PartialRecord<skillId, Ref<number>> = {};

	readonly character!: Character;

	constructor(id: multiplierId, character: Character) {
		const raw = rawMultipliers[id];
		this.id = id;
		this.name = raw.name ?? id;
		this.desc = raw.desc ?? `${id} Multiplier`;
		defineValue(this, "character", character);
	}

	get multiplier() {
		return Object.values(this.producers)
			.map(unref)
			.reduce((v, e) => v * e, 1);
	}
	get effectText(): string {
		return `x${KMBTFormat(this.multiplier)} ${this.name}`;
	}
	addProducer(source: Skill) {
		this.producers[source.id] = computed(
			() => source.currentEffects[this.id]!
		);
	}
}
function makeBase<Id, Raw extends object, Saved extends object>(data: {
	proto: Required<Raw>;
	makeSaved: () => Saved;
}) {
	class Base {
		id: Id;
		saved: Reactive<Saved>;
		readonly character!: Character;
		constructor(
			id: Id,
			character: Character,
			raw: Partial<Raw> = {},
			saved: Reactive<Saved> = reactive(data.makeSaved())
		) {
			this.id = id;
			this.saved = saved;
			for (let k in raw) if (raw[k] == null) delete raw[k];
			Object.assign(this, raw);
			defineValue(this, "character", character);
		}
		static makeSaved = data.makeSaved;
	}
	Object.assign(Base.prototype, data.proto);

	const saveKeys = Object.keys(data.makeSaved()) as (keyof Reactive<Saved>)[];
	for (let k of saveKeys) {
		Object.defineProperty(Base.prototype, k, {
			get(this: Base) {
				return this.saved[k];
			},
			set(this: Base, v) {
				this.saved[k] = v;
			},
		});
	}
	return Base as any as {
		new (...a: ConstructorParameters<typeof Base>): Base &
			Required<Raw> &
			Saved;
		makeSaved: typeof data.makeSaved;
	};
}

export class Job extends makeBase<jobId, RawJob, SavedJob>({
	proto: {
		category: "BasicJobs",
		name: "job",
		desc: "job desc",
		order: 999,
		requirements: {},
		levelExp: lv.pow(10, 1.1),
		levelPay: lv.lin(10, 0.1),
		expMultipliers: [],
		payMultipliers: [],
	},
	makeSaved: () => ({ currentExp: 0, currentLevel: 0, maxLevelReached: 0 }),
}) {
	constructor(id: jobId, character: Character) {
		super(
			id,
			character,
			{ name: id, desc: `${id} Job`, ...rawJobs[id] },
			(character.saved.jobs[id] ??= Job.makeSaved())
		);
	}

	get currentIncome(): money {
		return this.levelPay(this.currentLevel) * this.incomeMultiplier;
	}
	get currentExpGain(): multi {
		return this.expMultiplier;
	}
	get currentExpReq(): multi {
		return Math.floor(this.levelExp(this.currentLevel));
	}
	get expMultiplier(): multi {
		return this.expMultipliers
			.map((e) => this.character.multipliers[e].multiplier)
			.reduce((v, e) => v * e, 1);
	}
	get incomeMultiplier(): multi {
		return this.payMultipliers
			.map((e) => this.character.multipliers[e].multiplier)
			.reduce((v, e) => v * e, 1);
	}
	get isUnlocked(): boolean {
		if (this.requirements.prev) {
			if (this.previousJob!.currentLevel < this.requirements.prev)
				return false;
		}
		let jobs = this.requirements.jobs ?? {};
		for (let [jobId, level] of Object.entries(jobs)) {
			if (this.character.jobs[jobId].currentLevel < level) return false;
		}
		let skills = this.requirements.skills ?? {};
		for (let [skillId, level] of Object.entries(skills)) {
			if (this.character.skills[skillId].currentLevel < level)
				return false;
		}
		if (this.requirements.money) {
			if (this.character.saved.money < this.requirements.money)
				return false;
		}
		return true;
	}
	get previousJob() {
		return Object.values(this.character.jobs).find(
			(e) => e.category == this.category && e.order == this.order - 1
		);
	}
	explainRequirements() {
		const list: PartialRecord<
			jobId | skillId | "money",
			{
				value: number;
				target: number;
				met: boolean;
				source?: Job | Skill;
			}
		> = {};
		let jobs = this.requirements.jobs ?? {};
		if (this.requirements.prev)
			jobs[this.previousJob!.id] = this.requirements.prev;
		for (let [jobId, target] of Object.entries(jobs)) {
			let source = this.character.jobs[jobId];
			let value = source.currentLevel;
			list[jobId] = { target, value, met: value >= target, source };
		}
		let skills = this.requirements.skills ?? {};
		for (let [skillId, target] of Object.entries(skills)) {
			let source = this.character.skills[skillId];
			let value = source.currentLevel;
			list[skillId] = { target, value, met: value >= target, source };
		}
		if (this.requirements.money) {
			let target = this.requirements.money;
			let value = this.character.saved.money;
			list.money = { target, value, met: value >= target };
		}
		return list;
	}

	update(deltaTime: deltaTime) {
		if (this.character.saved.currentJob != this.id) return;
		this.character.saved.money += this.currentIncome * deltaTime;
		this.currentExp += this.currentExpGain * deltaTime;
		if (this.currentExp > this.currentExpReq) {
			this.currentExp -= this.currentExpReq;
			this.currentLevel++;
			// this.maxLevelReached.value = Math.max(this.maxLevelReached.value, this.currentLevel.value);
		}
	}

	select() {
		this.character.saved.currentJob = this.id;
	}
}

export class Skill extends makeBase<skillId, RawSkill, SavedSkill>({
	proto: {
		category: "BasicSkills",
		name: "skill",
		desc: "skill desc",
		order: 999,
		requirements: {},
		levelEffects: {},
		levelExp: lv.pow(10, 1.1),
		expMultipliers: [],
	},
	makeSaved: () => ({ currentExp: 0, currentLevel: 0, maxLevelReached: 0 }),
}) {
	constructor(id: skillId, character: Character) {
		super(
			id,
			character,
			{
				name: id,
				desc: `${id} Skill`,
				...rawSkills[id],
			},
			(character.saved.skills[id] ??= reactive(Skill.makeSaved()))
		);
		multiplierIds
			.filter((e) => this.levelEffects[e])
			.map((mid) => character.multipliers[mid].addProducer(this));
	}

	get currentExpGain(): multi {
		return this.expMultiplier;
	}
	get currentExpReq(): multi {
		return Math.floor(this.levelExp(this.saved.currentLevel));
	}
	levelEffectsAt(level: level) {
		return Object.fromEntries(
			Object.entries(this.levelEffects).map(([k, fn]) => [k, fn(level)])
		);
	}
	get currentEffects() {
		return this.levelEffectsAt(this.saved.currentLevel);
	}
	get expMultiplier(): multi {
		return this.expMultipliers
			.map((e) => this.character.multipliers[e].multiplier)
			.reduce((v, e) => v * e, 1);
	}
	get effectText(): string {
		const effects = this.levelEffectsAt(this.saved.currentLevel);
		return Object.entries(effects)
			.map((e) => e as [multiplierId, multi])
			.map(
				([k, v]) =>
					`x${KMBTFormat(v)} ${this.character.multipliers[k].name}`
			)
			.join("\n");
	}
	update(deltaTime: deltaTime) {
		if (this.character.saved.currentSkill != this.id) return;
		this.saved.currentExp += this.currentExpGain * deltaTime;
		if (this.saved.currentExp > this.currentExpReq) {
			this.saved.currentExp -= this.currentExpReq;
			this.saved.currentLevel++;
			// this.maxLevelReached.value = Math.max(this.maxLevelReached.value, this.currentLevel.value);
		}
	}

	select() {
		this.character.saved.currentSkill = this.id;
	}
}
