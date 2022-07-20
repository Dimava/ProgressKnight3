function check<T extends RawCategory>(v: T) {
	return v;
}

export const BasicJobs = check({
	type: "jobs",
});

export const BasicSkills = check({
	type: "skills",
});

export const Army = check({
	type: "jobs",
});
export const Cult = check({
	type: "jobs",
});
export const ThievesGuild = check({
	type: "jobs",
});
