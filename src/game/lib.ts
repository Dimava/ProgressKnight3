import { MaybeRef } from "@vueuse/core";
import { computed, isRef, reactive, ref, toRaw, toRef } from "vue";

export function usePerformanceNow() {
	return computed(() => performance.now());
}

export const now = usePerformanceNow();

export function useUpdate({
	paused: rawPaused,
	fn: rawFn,
}: { paused?: MaybeRef<boolean>; fn?: MaybeRef<(d: deltaTime) => void> } = {}) {
	const paused = isRef(rawPaused) ? rawPaused : ref(rawPaused ?? false);
	const fn = isRef(rawFn) ? rawFn : ref(rawFn);
	void (async function updateTicker() {
		const eps = 1e-6;
		const round = (n: number) => Math.round(n / eps) * eps;
		let prev = round(performance.now() / 1000);
		while (true) {
			let now = round((await new Promise(requestAnimationFrame)) / 1000);
			if (!paused.value) {
				try {
					fn.value?.(now - prev);
				} catch (e) {}
			}
			prev = now;
		}
	})();
	return {
		paused,
		fn,
	};
}

function deepAssign<T>(target: T, source: T) {
	for (let k in source) {
		if (typeof target[k] == 'undefined') {
			target[k] = source[k];
			continue;
		}
		if (typeof source[k] != typeof target[k]) {
			continue;
		}
		if (typeof source[k] != 'object') {
			target[k] = source[k];
		} else {
			deepAssign(target[k], source[k]);
		}
	}
	return target;
}

export function useLocalStorage<T extends object>(
	key: string,
	makeDefault: () => T
) {
	const data = reactive(makeDefault());
	function save() {
		localStorage.setItem(key, JSON.stringify(toRaw(data)));
	}
	function load() {
		deepAssign(data, JSON.parse(localStorage.getItem(key) ?? '{}'))
	}
	return {
		data, save, load
	};
}
