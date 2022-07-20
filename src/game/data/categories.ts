export const BasicJobs = check({
	type: "jobs",
});

export const BasicSkills = check({
	type: "skills",
});

function check<T extends RawCategory>(v: T) {
	return v;
}
