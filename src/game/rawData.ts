function round(n: number, base = 1) {
	if (base == 1) return Math.round(n);
	return Math.round(n / base) * base;
}

function xpPow(base: number, growth: number) {
	return (level: number) => round(base * growth ** level, 1);
}
function moneyLin(base: number, growth: number) {
	return (level: number) => base * (1 + growth * level);
}

function ensure<T>() {
	return function <V>(v: V & T) {
		return v;
	};
}

export const rawMultipliersMap = {
	mHappiness: 'x{eff} Happiness | Happiness | Multiplies EXP gain from all sources',
	mSkillExp: 'x{eff} Skill XP | Skill XP | Multiplies EXP gain for all skills',
	mJobExp: 'x{eff} Job XP | Job XP | Multiplies EXP gain for all jobs',
	mExpense: 'x{eff} Reduced Expenses | Reduced Expenses | Reduces expenses',
}

export type rawMultiplierId = keyof typeof rawMultipliersMap;




export const rawMultipliers: MultiplierData[] =
	Object.entries(rawMultipliersMap).map(([id, text]) => {
		const [effectTextTemplate, name, description] = text.split('|').map(e => e.trim())
		return {
			id: id as multiplierId,
			name, description, effectTextTemplate,
		};
	});

export const rawJobs: JobData[] = [
	{
		id: 'jSweeper',
		name: 'Sweeper',
		description: 'Sweep streets for some initial cash',
		category: 'jcCommon',
		requirements: [],
		levelExp: xpPow(50, 1.01),
		levelPay: moneyLin(10, 0.1),
		payMultipliers: [],
		expMultipliers: ['mJobExp'],
	},
];

export const rawSkills: SkillData[] = [
	{
		id: 'sConcentration',
		name: 'Concentration',
		description: 'Improve your learning speed',
		category: 'scFundamentals',
		effectTextTemplate: 'x{eff} Skill XP',
		levelExp: xpPow(50, 1.01),
		expMultipliers: ['mSkillExp'],
		multiplierEffects: (level) => ({
			mSkillExp: 1 + 0.01 * level,
		}),
		requirements: [],
	},
];

const rawShopItemsMap: Record<shopItemId, `${number}|${number}|${multiplierId | ''}|${string}`> = {
	sTent: '3e0  |1.5|mHappiness|A tent',
	sBook: '5e0  |1.5|mSkillExp| A book to read',
}

export const rawShopItems: ShopItemData[] = Object.values(rawShopItemsMap).map(([id, v]): ShopItemData => {
	const name = id.slice(1).replaceAll(/(.)(?=[A-Z])/g, `$1 `).trim();
	const [cost, eff, mul, desc] = v.split('|').map(e => e.trim()) as [string, string, multiplierId, displayedDesc];
	const category = ({ h: 'icHousing', i: 'icItem' } as const)[id[0]]!;
	return {
		id: id as shopItemId, name, desc, category,
		effects: { [mul]: +eff }, expense: +cost, requirements: [],
	}
});