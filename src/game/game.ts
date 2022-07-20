import { useLocalStorage } from "./lib";

// const save = useLocalStorage("testsave1-CHAR", (): CharaSa => ({}));

const charsave = useLocalStorage("testchar1", () => ({} as SavedCharacter));
