import { lv, moneyLin, xpPow } from "../lib";

export const Work = checkRawJob({
	category: "BasicJobs",
	order: 999,
	expMultipliers: ["Exp", "JobExp"],
	levelExp: xpPow(10, 1.1),
	levelPay: moneyLin(12, 0.1),
	payMultipliers: ["Pay"],
});

function checkRawJob<T extends RawJob>(v: T): T & RawJob {
	return v;
}
function checkPartialRawJob<T extends Partial<RawJob>>(v: T): T {
	return v;
}

let armyN = 0;
function makeArmy() {
	const N = ++armyN;
	const make125 = (n: number) => [1, 2, 5][n % 3] * 10 ** ~~(n / 3);
	const per = (levels: level, growth: number) => growth ** (1 / levels);
	return checkPartialRawJob({
		category: "Army",
		order: N,
		expMultipliers: ["Exp", "JobExp", "ArmyExp"],
		payMultipliers: ["Pay", "ArmyPay"],
		levelExp: lv.pow(make125(N + 3), per(50, 10)),
		levelPay: lv.lin(make125(N + 2), 0.1),
		requirements: { prev: N == 1 ? undefined : N * 5 },
	});
}

export const LesserSoldier = checkRawJob({
	desc: "An untrained soldier, composed of people without money to buy food. Very low pay, used as cannon fodder",
	...makeArmy(),
});
export const InfantrySole = checkRawJob({
	desc: "a soldier with basic training and minimally decent. Respectable work, but still a pawn in the big picture",
	...makeArmy(),
});
export const VeteranFootman = checkRawJob({
	desc: "An experienced soldier, who has trained for years and gained a knowledge of warfare that makes him more valuable than any ordinary infantryman",
	...makeArmy(),
});
export const Squire = checkRawJob({
	desc: "Some experienced soldiers are recognized by knights to become their squires. Equipped with new weapons, they are a prestige class",
	...makeArmy(),
});
export const Knight = checkRawJob({
	desc: "Steel-clad horse warriors with an indomitable experience making them as feared as they are admired",
	...makeArmy(),
});
Knight.requirements.skills = { ExpSkill: 25 };
Knight.requirements.multipliers = { ArmyPay: 4 };
Knight.requirements.money = 1e4;
export const EliteKnight = checkRawJob({
	desc: "Equipped with the best equipment possible, these knights serve the royal family",
	...makeArmy(),
});
export const HolyKnight = checkRawJob({
	desc: "Destroying battalions with holy magic, they are knights who mostly serve the Church to destroy demons",
	...makeArmy(),
});
export const General = checkRawJob({
	// desc: "General",
	...makeArmy(),
});
export const LegendaryKnight = checkRawJob({
	desc: "Feared by nations, capable of destroying a kingdom with his magical power. Every 100 years, only one Holy Knight demonstrates enough talent to earn this title.",
	...makeArmy(),
});
export const DragonKnight = checkRawJob({
	desc: "A living legend, a legendary knight capable of taming dragons has not appeared since founder",
	...makeArmy(),
});

// Cult of the Heavenly Demon
// Follower – Influenced by tales and legends about the occult, you follow demonic cults with some hesitation
// Cultist – Through your devotion, persistence, and magical potential, you have been admitted to the greatest of all demonic cults
// Executioner – Responsible for eliminating prisoners and traitors
// [Coming soon]
// Master of Rituals (ritual master?) – A scholar of black magic and blood rituals, you are responsible for making each ritual work
// Cult Leader – A master of dark magic, you now have the same power as the Chairman of the Arcane Association. But how long will this last?
// Heavenly Demon – Through many rituals, along with a great experience in black magic, you become something more than human, being a symbol of worship of the cult. Better find a way to hide your aura, or the Church will hunt you down.

// Thieves Guild
// Pawn – regular guild member, they are the legwork, being completely expendable. They earn little, but everyone starts somewhere, right?
// Spy – Infiltrating society, they collect information for the guild. There's a poison pill stashed in case they get caught
// Captain – The leader of the pawns, able to command others. An acceptable position that picks up some loot, but still disposable if necessary
// Black Hand – High echelon of the guild, mysterious assassins who help the guild master eliminate threats
// Tower (rook) – pillars of support, they are respected by the guild and gain social status
// Herald (herald) – Guild's right-hand man, advisor and representative
// Shadow King – Commanding the realm from the shadows and feared by all, the leader of the thieves' guild is bathed in money and status.
