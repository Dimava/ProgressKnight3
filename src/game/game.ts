import { useInterval, useIntervalFn, useLocalStorage, useRafFn, useStorage } from "@vueuse/core";
import { plainToClass, instanceToPlain, plainToClassFromExist } from "class-transformer";
import { computed, reactive, ref, toRef, unref } from "vue";
import { Job, Multiplier, PKGameData, Skill } from "./gameData";
import { KMBFormat, useLocalStorageSave, useUpdate } from "./lib";
import { rawJobs, rawMultipliers, rawSkills } from "./rawData";



const dataStorage = useLocalStorage<PKGameData>(
	'progress-knight-30-data',
	PKGameData.raw, {
	serializer: {
		read(raw) {
			return plainToClassFromExist(PKGameData.raw, JSON.parse(raw));
		},
		write(data) {
			console.log('save!');
			return JSON.stringify(instanceToPlain(data));
		}
	},
	// shallow: true,
	deep: false,
})

const q = useLocalStorageSave<PKGameData>('progress-knight-30-data')



useStorage




export class PKGame {
	data: PKGameData;

	multipliers: Record<multiplierId, Multiplier> = {} as any;
	jobs: Record<jobId, Job> = {};
	skills: Record<skillId, Skill> = {};

	localStorage = useLocalStorageSave<PKGameData>('progress-knight-30-data');

	load() {
		this.localStorage.load(this.data);
	}
	save() {
		this.localStorage.save(this.data);
	}

	update(deltaTime: deltaTime) {
		// console.log(deltaTime)
		let job = this.jobs[this.data.currentJob];
		job?.update(deltaTime);
		let skill = this.skills[this.data.currentSkill];
		skill?.update(deltaTime);
	}

	constructor() {
		this.data = new PKGameData();
		this.load();

		useUpdate({
			paused: toRef(this.data, 'paused'),
			fn: t => this.update(t),
		});

		useIntervalFn(() => this.save(), 30e3);

		rawMultipliers.forEach(e => this.multipliers[e.id] = new Multiplier(e, this));
		rawJobs.forEach(e => this.jobs[e.id] = new Job(e, this));
		rawSkills.forEach(e => this.skills[e.id] = new Skill(e, this));
	}

	selectJob(job: jobId) {
		this.data.currentJob = job;
	}
	selectSkill(skill: skillId) {
		this.data.currentSkill = skill;
	}

}



export const game = new PKGame();

export function useGame() {
	return {
		game,
		data: game.data,
	}
}


Object.assign(globalThis, { dataStorage, game, computed, ref, reactive, toRef, KMBFormat });
