import { computed, ComputedRef, reactive, Ref, ref, toRef, toRefs, unref, watch } from "vue";
import { PKGame } from "./game";
import { defineValue, useDataRef, useSourceWatch, KMBFormat } from "./lib";



export class PKGameData {
	money = 0;
	paused = false;

	jobs: Record<jobId, JobSave> = {};
	skills: Record<skillId, SkillSave> = {};

	currentJob: jobId = '' as any;
	currentSkill: skillId = '' as any;


	constructor() {
		return PKGameData.reactive = reactive(PKGameData.raw = this);
	}
	static raw: PKGameData;
	static reactive: PKGameData;
}

export class Base<Data> {
	_source: Data;
	_game: PKGame;
	_data: PKGameData;
	constructor(source: Data, game: PKGame) {
		this._source = defineValue(this, '_source', source);
		this._game = defineValue(this, '_game', game);
		this._data = defineValue(this, '_data', game.data);
		for (let k in source) {
			// @ts-ignore
			this[k] = useSourceWatch(source, k, this);
		}
	}
	static withSave<Data extends object, Save extends object>(savePath: keyof PKGameData, emptySave: Save) {
		// @ts-ignore
		class BaseWithSave extends Base<Data> implements Data, ToRefs<Save> {
			_save: Save;
			constructor(source: Data, game: PKGame) {
				super(source, game);
				let saveLocation = game.data[savePath as 'jobs'];
				let id = (source as JobData).id;
				let oldSave = saveLocation[id] ?? {};
				const save = reactive(JSON.parse(JSON.stringify(emptySave)));
				saveLocation[id] = Object.assign(save, oldSave);
				this._save = defineValue(this, '_save', save);
				Object.assign(this, toRefs(this._save));
			}
		}
		return BaseWithSave as any as (new (source: Data, game: PKGame) => Data & BaseWithSave & ToRefs<Save>);
	}
	static make<Data>() {
		return Base as typeof Base & (new (source: Data, game: PKGame) => Data);
	}
}

export class Multiplier extends Base.make<MultiplierData>() implements MultiplierImpl {
	producers: Record<skillId | jobId, Ref<number>> = reactive({});
	// multiplier: ComputedRef<number>;

	constructor(source: MultiplierData, game: PKGame) {
		super(source, game);
		// this.multiplier = computed(() => {
		// 	return Object.values(this.producers).map(unref).reduce((v, e) => v * e, 1);
		// });
	}
	get multiplier() {
		return Object.values(this.producers).map(unref).reduce((v, e) => v * e, 1);
	}
	get effectText(): string {
		const eff = KMBFormat(this.multiplier);
		return this.effectTextTemplate.replace('{eff}', eff);
	}
	addProducer(source: Skill) {
		this.producers[source.id] = computed(() => source.currentEffects[this.id]!)
	}
}

const jobEmptySave: JobSave = {
	currentExp: 0,
	currentLevel: 0,
	maxLevelReached: 0,
}

export class Job extends Base.withSave<JobData, JobSave>('jobs', jobEmptySave) implements JobImpl {
	get currentIncome(): money {
		return this.levelPay(this.currentLevel.value) * this.incomeMultiplier;
	}
	get currentExpGain(): multi {
		return this.expMultiplier;
	}
	get currentExpReq(): multi {
		return Math.floor(this.levelExp(this.currentLevel.value));
	}
	get expMultiplier(): multi {
		return this.expMultipliers.map(e => this._game.multipliers[e].multiplier).reduce((v, e) => v * e, 1);
	}
	get incomeMultiplier(): multi {
		return this.payMultipliers.map(e => this._game.multipliers[e].multiplier).reduce((v, e) => v * e, 1);
	}

	update(deltaTime: deltaTime) {
		this._data.money += this.currentIncome * deltaTime;
		this.currentExp.value += this.currentExpGain * deltaTime;
		if (this.currentExp.value > this.currentExpReq) {
			this.currentExp.value -= this.currentExpReq
			this.currentLevel.value++;
			// this.maxLevelReached.value = Math.max(this.maxLevelReached.value, this.currentLevel.value);
		}
	}
}



const skillEmptySave: SkillSave = {
	currentExp: 0,
	currentLevel: 0,
	maxLevelReached: 0,
}

export class Skill extends Base.withSave<SkillData, SkillSave>('skills', skillEmptySave) {
	get currentExpGain(): multi {
		return this.expMultiplier;
	}
	get currentExpReq(): multi {
		return Math.floor(this.levelExp(this.currentLevel.value));
	}
	get currentEffects() {
		return this.multiplierEffects(this.currentLevel.value);
	}
	get expMultiplier(): multi {
		return this.expMultipliers.map(e => this._game.multipliers[e].multiplier).reduce((v, e) => v * e, 1);
	}
	get effectText(): string {
		const v = Object.values(this.multiplierEffects(this.currentLevel.value));
		const eff = KMBFormat(v[0]);
		return this.effectTextTemplate.replace('{eff}', eff);
	}

	update(deltaTime: deltaTime) {
		this.currentExp.value += this.currentExpGain * deltaTime;
		if (this.currentExp.value > this.currentExpReq) {
			this.currentExp.value -= this.currentExpReq
			this.currentLevel.value++;
			// this.maxLevelReached.value = Math.max(this.maxLevelReached.value, this.currentLevel.value);
		}
	}

	constructor(source: SkillData, game: PKGame) {
		super(source, game);
		for (let k of Object.keys(this.multiplierEffects(0)) as multiplierId[]) {
			game.multipliers[k].addProducer(this);
		}
	}

}