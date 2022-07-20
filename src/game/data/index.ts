import * as multipliersRaw from "./multipliers";
export { multipliersRaw };
export type multiplierId = keyof typeof multipliersRaw;

import * as jobsRaw from "./jobs";
export { jobsRaw };
export type jobId = keyof typeof jobsRaw;



class Multiplier {
	id: `m${multiplierId}`;
	name: displayedName;
	desc: displayedDesc;

	constructor(id: multiplierId) {
		const raw = multipliersRaw[id];
		this.id = `m${id}`;
		this.name = raw.name ?? id;
		this.desc = raw.desc ?? `${id} Multiplier`;
	}
}


class Job {
	id: `m${multiplierId}`;
	name: displayedName;
	desc: displayedDesc;

	constructor(id: multiplierId) {
		const raw = multipliersRaw[id];
		this.id = `m${id}`;
		this.name = raw.name ?? id;
		this.desc = raw.desc ?? `${id} Multiplier`;
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