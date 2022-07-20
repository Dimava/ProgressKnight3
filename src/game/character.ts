import { Job, Multiplier, multiplierIds } from "./data";

export class Character {
	money: money = 0;
	multipliers: Record<multiplierId, Multiplier>;
	constructor(id: string, save: Reactive<SavedCharacter>) {
		this.multipliers = Object.fromEntries(
			multiplierIds.map((id) => [id, new Multiplier(id, this)])
		) as Record<multiplierId, Multiplier>;
	}
}
