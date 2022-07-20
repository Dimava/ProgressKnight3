
type Branded<T, V = string> = V & { __brand?: T };

type displayedName = Branded<"displayedName", string>;
type displayedDesc = Branded<"displayedDesc", string>;
type multiplierId = import('./data').multiplierId;

interface RawMultiplier {
	name?: displayedName;
	desc?: displayedDesc;
	effectTextTemplate?: string;
}

interface RawJob {
	name?: displayedName;
	desc?: displayedDesc;
	effectTextTemplate?: string;

	category: string;
	requirements?: RawRequirement[];

	levelPay: (level: number) => number;
	levelExp: (level: number) => number;

	payMultipliers: multiplierId[];
	expMultipliers: multiplierId[];
}

interface RawSkill {
	name?: displayedName;
	desc?: displayedDesc;
	effectTextTemplate?: string;
}

interface RawRequirement {

}

// type deltaTime = Branded<'deltaTime', number>;
// type percent = Branded<'percent', number>;

// type level = Branded<'level', number>;
// type exp = Branded<'exp', number>;
// type multi = Branded<'multiplier', number>;
// type money = Branded<'money', number>;

// type multiplierId = //Branded<'multiplierId',
// 	import('./rawData').rawMultiplierId; //>;
// type skillId = Branded<'skillId', `s${string}`>;
// type jobId = Branded<'jobId', `j${string}`>;
// type shopItemId = Branded<'shopItem', `${'s' | 'h'}${string}`>;

// type anyId = string;

// type SavedRef<T> = Branded<'persistent', Ref<T>>;

// type IRequirement =
// 	| { type: 'money', min: number }
// 	| { type: 'job', id: jobId, min: number }
// 	| { type: 'skill', id: skillId, min: number };

// interface JobData {
// 	id: jobId;
// 	name: displayedName;
// 	description: displayedDesc;
// 	category: `jc${string}`;
// 	requirements: IRequirement[];

// 	levelPay: (level: number) => number;
// 	/** exp to next level */
// 	levelExp: (level: number) => number;

// 	payMultipliers: multiplierId[];
// 	expMultipliers: multiplierId[];
// }

// interface JobSave {
// 	currentLevel: level;
// 	currentExp: exp;
// 	maxLevelReached: level;
// }

// interface JobImpl {
// 	readonly currentIncome: money;
// }

// interface SkillData {
// 	id: skillId;
// 	name: displayedName;
// 	description: displayedDesc;
// 	category: `sc${string}`;
// 	requirements: IRequirement[];

// 	effectTextTemplate?: string;

// 	levelExp: (level: level) => number;

// 	expMultipliers: multiplierId[];

// 	multiplierEffects: (level: level) => Partial<Record<multiplierId, multi>>;
// }

// interface SkillSave {
// 	currentLevel: level;
// 	currentExp: exp;
// 	maxLevelReached: level;
// }

// interface MultiplierData {
// 	id: multiplierId;
// 	name: displayedName;
// 	description: displayedDesc;

// 	effectTextTemplate?: string;
// }

// interface MultiplierImpl {
// 	// producers: Record<UNKNOWN, Ref<number>>;
// 	// multiplier: ComputedRef<number>;
// 	readonly multiplier: number;
// }

// type UNKNOWN = never;

// interface ShopItemData {
// 	id: shopItemId,
// 	name: displayedName,
// 	desc: displayedDesc,
// 	expense: money,
// 	effects: Partial<Record<multiplierId, multi>>;
// 	category: `ic${string}`;
// 	requirements: IRequirement[];
// }
// interface ShopItemSave {
// 	toggledOn: boolean,
// }
