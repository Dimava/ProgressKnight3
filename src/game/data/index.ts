import * as rawMultipliers from "./multipliers";
export { rawMultipliers as rawMultipliers };
export type multiplierId = keyof typeof rawMultipliers;
export const multiplierIds = Object.keys(rawMultipliers) as multiplierId[];

import * as rawJobs from "./jobs";
export { rawJobs as jobsRaw };
export type jobId = keyof typeof rawJobs;
export const jobIds = Object.keys(rawJobs) as jobId[];

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

export class Multiplier {
	id: multiplierId;
	name: displayedName;
	desc: displayedDesc;

	producers: Partial<Record<jobId, Ref<number>>> = {};

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
		// this.producers[source.id] = computed(
		// 	() => source.currentEffects[this.id]!
		// );
	}
}

export class Job implements RawJob {
	id: jobId;
	name: NonNullable<RawJob["name"]>;
	desc: NonNullable<RawJob["desc"]>;
	category: NonNullable<RawJob["category"]>;
	levelPay!: NonNullable<RawJob["levelPay"]>;
	levelExp!: NonNullable<RawJob["levelExp"]>;
	payMultipliers!: NonNullable<RawJob["payMultipliers"]>;
	expMultipliers!: NonNullable<RawJob["expMultipliers"]>;

	saved: Reactive<SavedJob>;

	private readonly character!: Character;
	constructor(id: jobId, character: Character) {
		const raw = rawJobs[id];
		Object.assign(this, raw);
		this.id = id;
		this.name = raw.name ?? id;
		this.desc = raw.desc ?? `${id} Job`;
		this.category = raw.category;

		this.saved = character.saved.jobs[id] ??= reactive(Job.createSave());
		defineValue(this, "character" as any, character);
	}
	effectTextTemplate?: string | undefined;
	requirements?: RawRequirement[] | undefined;
	static createSave(): SavedJob {
		return {
			currentExp: 0,
			currentLevel: 0,
			maxLevelReached: 0,
		};
	}
	static ensuredRaw(raw: RawJob) {
		return Object.assign({});
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

class Skill {
	// get currentExpGain(): multi {
	// 	return this.expMultiplier;
	// }
	// get currentExpReq(): multi {
	// 	return Math.floor(this.levelExp(this.currentLevel.value));
	// }
	// get currentEffects() {
	// 	return this.multiplierEffects(this.currentLevel.value);
	// }
	// get expMultiplier(): multi {
	// 	return this.expMultipliers
	// 		.map((e) => this._game.multipliers[e].multiplier)
	// 		.reduce((v, e) => v * e, 1);
	// }
	// get effectText(): string {
	// 	if (this.effectTextTemplate) {
	// 		const v = Object.values(
	// 			this.multiplierEffects(this.currentLevel.value)
	// 		);
	// 		const eff = KMBFormat(v[0]);
	// 		return this.effectTextTemplate.replace("{eff}", eff);
	// 	} else {
	// 		const effects = this.multiplierEffects(this.currentLevel.value);
	// 		return Object.entries(effects)
	// 		.map((e) => e as [multiplierId, multi])
	// 		.map(([k, v]) => `x${KMBFormat(v)} ${this._game.multipliers[k].name}`).join('\n');
	// 	}
	// }
	// update(deltaTime: deltaTime) {
	// 	this.currentExp.value += this.currentExpGain * deltaTime;
	// 	if (this.currentExp.value > this.currentExpReq) {
	// 		this.currentExp.value -= this.currentExpReq;
	// 		this.currentLevel.value++;
	// 		// this.maxLevelReached.value = Math.max(this.maxLevelReached.value, this.currentLevel.value);
	// 	}
	// }
}
