import * as rawMultipliers from "./multipliers";
export { rawMultipliers as rawMultipliers };
export type multiplierId = keyof typeof rawMultipliers;
export const multiplierIds = Object.keys(rawMultipliers) as multiplierId[];

import * as rawJobs from "./jobs";
export { rawJobs as jobsRaw };
export type jobId = keyof typeof rawJobs;
export const jobIds = Object.keys(rawMultipliers) as jobId[];

import * as rawCategories from "./categories";
import { Character } from "../character";
import { reactive } from "vue";
export type categoryId = keyof typeof rawCategories;
type filteredCategoryIds<Q> = keyof {
	[K in categoryId as typeof rawCategories[K] extends { type: Q }
		? K
		: never]: true;
};
export type jobCategoryId = filteredCategoryIds<"jobs">;

export class Multiplier {
	id: multiplierId;
	name: displayedName;
	desc: displayedDesc;

	readonly character: Character;

	constructor(id: multiplierId, character: Character) {
		const raw = rawMultipliers[id];
		this.id = id;
		this.name = raw.name ?? id;
		this.desc = raw.desc ?? `${id} Multiplier`;
		this.character = character;
	}
}

export class Job {
	id: jobId;
	name: displayedName;
	desc: displayedDesc;

	saved: Reactive<SavedJob>;

	constructor(id: jobId) {
		const raw = rawJobs[id];
		this.id = id;
		this.name = raw.name ?? id;
		this.desc = raw.desc ?? `${id} Job`;

		this.saved = reactive;
	}

	// get currentIncome(): money {
	// 	return this.levelPay(this.currentLevel.value) * this.incomeMultiplier;
	// }
	// get currentExpGain(): multi {
	// 	return this.expMultiplier;
	// }
	// get currentExpReq(): multi {
	// 	return Math.floor(this.levelExp(this.currentLevel.value));
	// }
	// get expMultiplier(): multi {
	// 	return this.expMultipliers
	// 		.map((e) => this._game.multipliers[e].multiplier)
	// 		.reduce((v, e) => v * e, 1);
	// }
	// get incomeMultiplier(): multi {
	// 	return this.payMultipliers
	// 		.map((e) => this._game.multipliers[e].multiplier)
	// 		.reduce((v, e) => v * e, 1);
	// }

	// update(deltaTime: deltaTime) {
	// 	this._data.money += this.currentIncome * deltaTime;
	// 	this.currentExp.value += this.currentExpGain * deltaTime;
	// 	if (this.currentExp.value > this.currentExpReq) {
	// 		this.currentExp.value -= this.currentExpReq;
	// 		this.currentLevel.value++;
	// 		// this.maxLevelReached.value = Math.max(this.maxLevelReached.value, this.currentLevel.value);
	// 	}
	// }
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
