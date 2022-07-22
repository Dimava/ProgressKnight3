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
		const sv = source[k],
			tv = target[k];
		if (sv != sv /* isNaN */) continue;
		if (sv == null) continue;
		if (tv == null) {
			target[k] = sv;
			continue;
		}
		if (typeof sv != typeof tv) continue;
		if (typeof sv != "object") {
			target[k] = sv;
		} else {
			deepAssign(tv, sv);
		}
	}
	return target;
}

export function useLocalStorage<T extends object>(
	key: string,
	makeDefault: () => T
) {
	const data: Reactive<T> = reactive(makeDefault());
	function save() {
		localStorage.setItem(key, JSON.stringify(toRaw(data)));
	}
	function load() {
		deepAssign(data, JSON.parse(localStorage.getItem(key) ?? "{}"));
		return data;
	}
	function reset() {
		localStorage.setItem(key, JSON.stringify(makeDefault()));
		location.reload();
	}
	load();
	return {
		data,
		save,
		load,
		reset,
	};
}

export const lv = {
	pow(base: number, growth: number, roundBase = 1) {
		return (level: level) => round(base * growth ** level, roundBase);
	},
	lin(base: number, growth: number) {
		return (level: level) => base * (1 + growth * level);
	},
};

export function xpPow(base: number, growth: number) {
	return (level: level) => round(base * growth ** level, 1);
}
export function moneyLin(base: number, growth: number) {
	return (level: level) => base * (1 + growth * level);
}
export function round(n: number, base = 1) {
	if (!base) return n;
	if (base == 1) return Math.round(n);
	return Math.round(n / base) * base;
}

export function defineValue<T, K extends keyof T>(o: T, p: K, v: T[K] = o[p]) {
	Object.defineProperty(o, p, {
		value: v,
		configurable: true,
		enumerable: false,
		writable: true,
	});
	return o[p];
}

/** rounding down, over 1e4 */
export function KMBTFormat(n: number) {
	const suffixes = "K,M,B,T".split(",");
	if (n < 1e4)
		return n
			.toFixed(4)
			.replace(/\.?0+$/, "")
			.slice(0, 4)
			.replace(/\.$/, "");
	let [s, a, b, e] =
		n.toExponential(4).match(/(\d+)\.(\d+)e\+(\d+)/) || suffixes;
	a += b;
	let pow = +e;
	let mod = pow % 3;
	let div = ~~(pow / 3);
	a = a.slice(0, 1 + mod) + "." + a.slice(1 + mod);
	s = suffixes[div - 1] || "e" + div * 3;
	return `${a.slice(0, 5)}${s}`;
}

export function stableKMBTFormat(n: number, digits: 3 | 3.5 | 4 = 3.5) {
	small: if (n < 1e3) {
		if (digits == 3.5) digits = 3;
		// D digits, one dot
		const log = n.toFixed(1).length - 2;
		let text = n.toFixed(Math.max(0, digits - log));
		if (digits == log) text += ".";
		return text;
	}
	thousand: if (n < 1e4 && digits > 3) {
		if (digits <= 4) return n.toFixed(0) + ".";
		const log = n.toFixed(1).length - 2;
		return n.toFixed(Math.max(0, digits - log));
	}
	if (digits == 3.5) digits = 3;

	const suffixes = "K,M,B,T".split(",");
	let [s, a, b, e] =
		n.toExponential(digits).match(/(\d+)\.(\d+)e\+(\d+)/) || suffixes;
	a += b;
	let pow = +e;
	let mod = pow % 3;
	let div = ~~(pow / 3);
	a = a.slice(0, 1 + mod) + "." + a.slice(1 + mod);
	s = suffixes[div - 1] || "e" + div * 3;
	return `${a.slice(0, digits + 1)}${s}`;
}

export function propertyComparator<
	T,
	K extends keyof T,
	V extends Record<K, number | string>
>(keys: K | K[]): (a: T & V, b: T & V) => number {
	let usedKeys = Array.isArray(keys) ? keys : [keys];
	return function (a, b) {
		for (let k of usedKeys) {
			let av = a[k],
				bv = b[k];
			if (av < bv) return -1;
			if (av > bv) return -1;
		}
		return 0;
	};
}

type MaybeArray<T> = T | T[];
export function vsort<T, V extends MaybeArray<number | string>>(
	array: T[],
	map: (e: T, i: number, a: T[]) => V
): T[] {
	return array
		.map((e, i, a) => {
			let v = map(e, i, a);
			return {
				e,
				v: (Array.isArray(v) ? v : [v]) as (number | string)[],
			};
		})
		.sort((a, b) => {
			for (let i = 0; i < a.v.length; i++) {
				if (a.v[i] < b.v[i]) return -1;
				if (a.v[i] > b.v[i]) return 1;
			}
			return 0;
		})
		.map((e) => e.e);
}

export function idToName(id: string): displayedName {
	return id.replaceAll(/(?<!^)(?=[A-Z])/g, " ");
}
