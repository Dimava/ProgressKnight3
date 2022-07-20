import { OptionalKeysOf } from "type-fest";
import { computed } from "vue";

import * as rawMultipliers from "./multipliers";
export { rawMultipliers };
export type multiplierId = keyof typeof rawMultipliers;
export const multiplierIds = Object.keys(rawMultipliers) as multiplierId[];

import * as rawJobs from "./jobs";
export { rawJobs };
export type jobId = keyof typeof rawJobs;
export const jobIds = Object.keys(rawJobs) as jobId[];

import * as rawSkills from "./skills";
export { rawSkills };
export type skillId = keyof typeof rawSkills;
export const skillIds = Object.keys(rawSkills) as skillId[];

import * as rawCategories from "./categories";
import { Character } from "../character";
import { reactive, unref } from "vue";
import { defineValue, KMBTFormat } from "../lib";
export type categoryId = keyof typeof rawCategories;
export const categoryIds = Object.keys(rawCategories) as categoryId[];
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

export class Job implements RawJob {
	id!: jobId;
	name!: NonNullable<RawJob["name"]>;
	desc!: NonNullable<RawJob["desc"]>;
	category!: NonNullable<RawJob["category"]>;
	levelPay!: NonNullable<RawJob["levelPay"]>;
	levelExp!: NonNullable<RawJob["levelExp"]>;
	payMultipliers!: NonNullable<RawJob["payMultipliers"]>;
	expMultipliers!: NonNullable<RawJob["expMultipliers"]>;

	saved: Reactive<SavedJob>;

	private readonly character!: Character;
	constructor(id: jobId, character: Character) {
		const raw = rawJobs[id];
		Object.assign(this, Job.ensuredRaw(id, raw));

		this.saved = character.saved.jobs[id] ??= reactive(Job.createSave());
		defineValue(this, "character" as any, character);
	}
	static createSave(): SavedJob {
		return {
			currentExp: 0,
			currentLevel: 0,
			maxLevelReached: 0,
		};
	}
	static ensuredRaw(id: jobId, raw: RawJob = rawJobs[id]) {
		const optionals: { id: jobId } & {
			[K in OptionalKeysOf<RawJob>]: NonNullable<RawJob[K]>;
		} = { id, name: id, desc: `${id} Job`, requirements: [] };
		return Object.assign(optionals, raw);
	}

	get currentIncome(): money {
		return this.levelPay(this.saved.currentLevel) * this.incomeMultiplier;
	}
	get currentExpGain(): multi {
		return this.expMultiplier;
	}
	get currentExpReq(): multi {
		return Math.floor(this.levelExp(this.saved.currentLevel));
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

	update(deltaTime: deltaTime) {
		if (this.character.saved.currentJob != this.id) return;
		this.character.saved.money += this.currentIncome * deltaTime;
		this.saved.currentExp += this.currentExpGain * deltaTime;
		if (this.saved.currentExp > this.currentExpReq) {
			this.saved.currentExp -= this.currentExpReq;
			this.saved.currentLevel++;
			// this.maxLevelReached.value = Math.max(this.maxLevelReached.value, this.currentLevel.value);
		}
	}

	select() {
		this.character.saved.currentJob = this.id;
	}
}

export class Skill {
	id!: skillId;
	name!: NonNullable<RawSkill["name"]>;
	desc!: NonNullable<RawSkill["desc"]>;
	category!: NonNullable<RawSkill["category"]>;
	levelEffects!: NonNullable<RawSkill["levelEffects"]>;
	levelExp!: NonNullable<RawSkill["levelExp"]>;
	expMultipliers!: NonNullable<RawSkill["expMultipliers"]>;

	saved: Reactive<SavedSkill>;

	private readonly character!: Character;
	constructor(id: skillId, character: Character) {
		const raw = rawSkills[id];
		Object.assign(this, Skill.ensuredRaw(id, raw));

		this.saved = character.saved.skills[id] ??= reactive(
			Skill.createSave()
		);
		defineValue(this, "character" as any, character);
		multiplierIds
			.filter((e) => this.levelEffects[e])
			.map((mid) => character.multipliers[mid].addProducer(this));
	}
	static createSave(): SavedSkill {
		return {
			currentExp: 0,
			currentLevel: 0,
			maxLevelReached: 0,
		};
	}
	static ensuredRaw(id: skillId, raw: RawSkill = rawSkills[id]) {
		const optionals: { id: skillId } & {
			[K in OptionalKeysOf<RawSkill>]: NonNullable<RawSkill[K]>;
		} = { id, name: id, desc: `${id} Job`, requirements: [] };
		return Object.assign(optionals, raw);
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
