function check<T extends RawCategory>(v: T) {
	return v;
}

export const BasicJobs = check({
	type: "jobs",
	order: 999,
});

export const BasicSkills = check({
	type: "skills",
	order: 999,
});

export const Army = check({
	type: "jobs",
	order: 1,
});
export const Cult = check({
	type: "jobs",
	order: 2,
});
export const ThievesGuild = check({
	type: "jobs",
	order: 3,
});
