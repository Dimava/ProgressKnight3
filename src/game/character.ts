import { Job, jobIds, Multiplier, multiplierIds } from "./data";

export class Character {
	multipliers: Record<multiplierId, Multiplier>;
	jobs: Record<jobId, Job>;

	saved: Reactive<SavedCharacter>;
	constructor(id: string, save: Reactive<SavedCharacter>) {
		this.saved = save;
		this.multipliers = Object.fromEntries(
			multiplierIds.map((id) => [id, new Multiplier(id, this)])
		) as Record<multiplierId, Multiplier>;
		this.jobs = Object.fromEntries(
			jobIds.map((id) => [id, new Job(id, this)])
		) as Record<jobId, Job>;
	}
	update(deltaTime: deltaTime) {
		if (this.saved.paused) deltaTime = 0;
		for (let job of Object.values(this.jobs)) {
			job.update(deltaTime);
		}
	}
}
