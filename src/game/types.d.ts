type Branded<T, V = string> = V & { __brand?: T };

type displayedName = Branded<"displayedName", string>;
type displayedDesc = Branded<"displayedDesc", string>;
type multiplierId = import("./data").multiplierId;
type jobCategoryId = import("./data").jobCategoryId;
type skillCategoryId = import("./data").skillCategoryId;
type skillId = import("./data").skillId;
type jobId = import("./data").jobId;

interface RawMultiplier {
	name?: displayedName;
	desc?: displayedDesc;
	order: number;
	effectTextTemplate?: string;
}

interface RawJob {
	name?: displayedName;
	desc?: displayedDesc;
	order?: number;

	category: jobCategoryId;
	requirements?: RawRequirement;

	levelPay: (level: level) => number;
	levelExp: (level: level) => number;

	payMultipliers: multiplierId[];
	expMultipliers: multiplierId[];
}

interface RawSkill {
	name?: displayedName;
	desc?: displayedDesc;
	order?: number;

	category: skillCategoryId;
	requirements?: RawRequirement;

	levelEffects: PartialRecord<multiplierId, (level: level) => number>;
	levelExp: (level: level) => number;

	expMultipliers: multiplierId[];
}

interface RawRequirement {
	/** require level of previous job */
	prev?: level;
	jobs?: PartialRecord<jobId, level>;
	skills?: PartialRecord<skillId, level>;
	money?: money;
}

interface RawCategory {
	type: "jobs" | "skills";
	order: number;
	name?: displayedName;
	desc?: displayedDesc;
}

interface SavedSkill {
	currentLevel: level;
	currentExp: exp;
	maxLevelReached: level;
}
interface SavedJob {
	currentLevel: level;
	currentExp: exp;
	maxLevelReached: level;
}
interface SavedCharacter {
	jobs: Record<jobId, SavedJob>;
	skills: Record<skillId, SavedSkill>;

	money: money;
	currentJob?: jobId;
	currentSkill?: skillId;
	paused: boolean;
}

type deltaTime = Branded<"deltaTime", number>;
type percent = Branded<"percent", number>;

type level = Branded<"level", number>;
type exp = Branded<"exp", number>;
type multi = Branded<"multiplier", number>;
type money = Branded<"money", number>;

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

// 	multiplierEffects: (level: level) => PartialRecord<multiplierId, multi>;
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
// 	effects: PartialRecord<multiplierId, multi>;
// 	category: `ic${string}`;
// 	requirements: IRequirement[];
// }
// interface ShopItemSave {
// 	toggledOn: boolean,
// }

interface ObjectConstructor {
	fromEntries<K extends string, V>(entries: [K, V][]): PartialRecord<K, V>;
}

type PartialRecord<K extends keyof any, T> = {
	[P in K]?: T;
};

interface ObjectConstructor {
	entries<K, V>(o: PartialRecord<K, V>): [K, V][];
	// entries<T extends PartialRecord<infer K, infer V>>(o?: T): [K, V][];
	// entries(o: undefined): [];
}
