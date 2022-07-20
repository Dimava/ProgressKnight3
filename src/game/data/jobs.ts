import { moneyLin, xpPow } from "../lib";

function check<T extends RawJob>(v: T) {
	return v;
}

export const Work = check({
	category: "BasicJobs",
	expMultipliers: ["Happiness", "JobExp"],
	levelExp: xpPow(50, 1.01),
	levelPay: moneyLin(12, 0.1),
	payMultipliers: ["Pay"],
});
