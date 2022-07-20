import { lv, moneyLin, xpPow } from "../lib";

export const Work: RawJob = {
	category: "BasicJobs",
	expMultipliers: ["Happiness", "JobExp"],
	levelExp: xpPow(10, 1.1),
	levelPay: moneyLin(12, 0.1),
	payMultipliers: ["Pay"],
};

export const LesserSoldier: RawJob = {
	category: "Army",
	desc: "An untrained soldier, composed of people without money to buy food. Very low pay, used as cannon fodder",
	expMultipliers: ["Happiness", "JobExp", "ArmyExp"],
	payMultipliers: ["Pay", "ArmyPay"],
	levelExp: lv.pow(50, 1.1),
	levelPay: lv.lin(50, 0.1),
};
export const InfantrySole: RawJob = {
	category: "Army",
	desc: "a soldier with basic training and minimally decent. Respectable work, but still a pawn in the big picture",
	expMultipliers: ["Happiness", "JobExp", "ArmyExp"],
	payMultipliers: ["Pay", "ArmyPay"],
	levelExp: lv.pow(50, 1.1),
	levelPay: lv.lin(50, 0.1),
};
export const VeteranFootman: RawJob = {
	category: "Army",
	desc: "An experienced soldier, who has trained for years and gained a knowledge of warfare that makes him more valuable than any ordinary infantryman",
	expMultipliers: ["Happiness", "JobExp", "ArmyExp"],
	payMultipliers: ["Pay", "ArmyPay"],
	levelExp: lv.pow(50, 1.1),
	levelPay: lv.lin(50, 0.1),
};
export const Squire: RawJob = {
	category: "Army",
	desc: "Some experienced soldiers are recognized by knights to become their squires. Equipped with new weapons, they are a prestige class",
	expMultipliers: ["Happiness", "JobExp", "ArmyExp"],
	payMultipliers: ["Pay", "ArmyPay"],
	levelExp: lv.pow(50, 1.1),
	levelPay: lv.lin(50, 0.1),
};
export const Knight: RawJob = {
	category: "Army",
	desc: "Steel-clad horse warriors with an indomitable experience making them as feared as they are admired",
	expMultipliers: ["Happiness", "JobExp", "ArmyExp"],
	payMultipliers: ["Pay", "ArmyPay"],
	levelExp: lv.pow(50, 1.1),
	levelPay: lv.lin(50, 0.1),
};
export const EliteKnight: RawJob = {
	category: "Army",
	desc: "Equipped with the best equipment possible, these knights serve the royal family",
	expMultipliers: ["Happiness", "JobExp", "ArmyExp"],
	payMultipliers: ["Pay", "ArmyPay"],
	levelExp: lv.pow(50, 1.1),
	levelPay: lv.lin(50, 0.1),
};
export const HolyKnight: RawJob = {
	category: "Army",
	desc: "Destroying battalions with holy magic, they are knights who mostly serve the Church to destroy demons",
	expMultipliers: ["Happiness", "JobExp", "ArmyExp"],
	payMultipliers: ["Pay", "ArmyPay"],
	levelExp: lv.pow(50, 1.1),
	levelPay: lv.lin(50, 0.1),
};
export const General: RawJob = {
	category: "Army",
	desc: "General",
	expMultipliers: ["Happiness", "JobExp", "ArmyExp"],
	payMultipliers: ["Pay", "ArmyPay"],
	levelExp: lv.pow(50, 1.1),
	levelPay: lv.lin(50, 0.1),
};
export const LegendaryKnight: RawJob = {
	category: "Army",
	desc: "Feared by nations, capable of destroying a kingdom with his magical power. Every 100 years, only one Holy Knight demonstrates enough talent to earn this title.",
	expMultipliers: ["Happiness", "JobExp", "ArmyExp"],
	payMultipliers: ["Pay", "ArmyPay"],
	levelExp: lv.pow(50, 1.1),
	levelPay: lv.lin(50, 0.1),
};
export const DragonKnight: RawJob = {
	category: "Army",
	desc: "A living legend, a legendary knight capable of taming dragons has not appeared since founder",
	expMultipliers: ["Happiness", "JobExp", "ArmyExp"],
	payMultipliers: ["Pay", "ArmyPay"],
	levelExp: lv.pow(50, 1.1),
	levelPay: lv.lin(50, 0.1),
};

// Progress knight english game
// Army
// - Lesser soldier – An untrained soldier, composed of people without money to buy food. Very low pay, used as cannon fodder
// -infantry sole (footman) – a soldier with basic training and minimally decent. Respectable work, but still a pawn in the big picture
// -Veteran Footman – An experienced soldier, who has trained for years and gained a knowledge of warfare that makes him more valuable than any ordinary infantryman
// –Squire (Squire) – Some experienced soldiers are recognized by knights to become their squires. Equipped with new weapons, they are a prestige class
// –Knight – Steel-clad horse warriors with an indomitable experience making them as feared as they are admired
// –Elite Knight – Equipped with the best equipment possible, these knights serve the royal family
// –Holy Knight – Destroying battalions with holy magic, they are knights who mostly serve the Church to destroy demons
// –General –
// –Legendary Knight – Feared by nations, capable of destroying a kingdom with his magical power. Every 100 years, only one Holy Knight demonstrates enough talent to earn this title.
// –Dragon Knight – A living legend, a legendary knight capable of taming dragons has not appeared since founder

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
