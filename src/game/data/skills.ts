import { moneyLin, xpPow, lv } from "../lib";

export const ExpSkill: RawSkill = {
	category: "BasicSkills",
	expMultipliers: ["Exp", "SkillExp"],
	levelExp: lv.pow(10, 1.1),
	levelEffects: {
		Exp: lv.lin(1, 0.1),
	},
};

export const SkillExpSkill: RawSkill = {
	category: "BasicSkills",
	expMultipliers: ["Exp", "SkillExp"],
	levelExp: lv.pow(10, 1.1),
	levelEffects: {
		SkillExp: lv.lin(1, 0.1),
	},
};

export const JobExpSkill: RawSkill = {
	category: "BasicSkills",
	expMultipliers: ["Exp", "SkillExp"],
	levelExp: lv.pow(10, 1.1),
	levelEffects: {
		JobExp: lv.lin(1, 0.1),
	},
};

export const ArmyExpSkill: RawSkill = {
	category: "BasicSkills",
	expMultipliers: ["Exp", "SkillExp"],
	levelExp: lv.pow(10, 1.1),
	levelEffects: {
		ArmyExp: lv.lin(1, 0.1),
	},
};

export const ArmyPaySkill: RawSkill = {
	category: "BasicSkills",
	expMultipliers: ["Exp", "SkillExp"],
	levelExp: lv.pow(10, 1.1),
	levelEffects: {
		ArmyPay: lv.lin(1, 0.1),
	},
};

export const AllWaySkill: RawSkill = {
	category: "BasicSkills",
	expMultipliers: ["Exp", "SkillExp"],
	levelExp: lv.pow(10, 1.1),
	levelEffects: {
		Exp: lv.lin(1, 0.01),
		ArmyExp: lv.lin(1, 0.01),
		Expense: lv.lin(1, 0.01),
		JobExp: lv.lin(1, 0.01),
		Pay: lv.lin(1, 0.01),
		SkillExp: lv.lin(1, 0.01),
		ArmyPay: lv.lin(1, 0.01),
	},
};
