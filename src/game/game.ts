import { Character } from "./character";
import { useLocalStorage, useUpdate } from "./lib";
import { ref, toRef } from "vue";

export const charsave = useLocalStorage(
	"testchar1",
	() =>
		({
			jobs: {},
			skills: {},
			money: 0,
			paused: false,
		} as SavedCharacter)
);

export const char = new Character("testchar", charsave.data);

// setInterval(() => {
// 	char.update(0.1);
// }, 100);
export const gameSpeed = ref(1);

const up = useUpdate({
	fn: (d) => char.update(d * gameSpeed.value),
	paused: toRef(char.saved, "paused"),
});

Object.assign(globalThis, { charsave, char, up });
