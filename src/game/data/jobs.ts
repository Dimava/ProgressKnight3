import { moneyLin, xpPow } from "../lib";

function check<T extends RawJob>(v: T) {
	return v;
}

export const Work: RawJob = {
	category: "BasicJobs",
	expMultipliers: ["Happiness", "JobExp"],
	levelExp: xpPow(10, 1.1),
	levelPay: moneyLin(12, 0.1),
	payMultipliers: ["Pay"],
};
