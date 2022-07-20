// import { MaybeRef } from "@vueuse/core";
// import { instanceToPlain, plainToClassFromExist } from "class-transformer";
// import { computed, isRef, reactive, ref, toRef, watch } from "vue";
// import { PKGame } from "./game";

// export function usePerformanceNow() {
// 	return computed(() => performance.now());
// }

// export const now = usePerformanceNow();

// let a: deltaTime

// export function useUpdate({ paused: rawPaused, fn: rawFn }: { paused?: MaybeRef<boolean>, fn?: MaybeRef<(d: deltaTime) => void> } = {}) {
// 	const paused = isRef(rawPaused) ? rawPaused : ref(rawPaused ?? false);
// 	const fn = isRef(rawFn) ? rawFn : ref(rawFn)
// 	void async function updateTicker() {
// 		const eps = 1e-6;
// 		const round = (n: number) => Math.round(n / eps) * eps;
// 		let prev = round(performance.now() / 1000);
// 		while (true) {
// 			let now = round(await new Promise(requestAnimationFrame) / 1000);
// 			if (!paused.value) {
// 				try {
// 					fn.value?.(now - prev);
// 				} catch (e) { }
// 			}
// 			prev = now;
// 		}
// 	}();
// 	return {
// 		paused, fn,
// 	};
// }

// export function useSourceWatch<T extends object, K extends keyof T>(source: T, prop: K, target: T): T[K] {
// 	const ref = toRef(source, prop);
// 	watch(ref, () => { target[prop] = ref.value });
// 	return source[prop];
// }

// type JsonGet<T, K extends string> = [T] extends [Record<K, any>] ? T[K] : never;
// type JsonPath<T, K extends string> =
// 	| K extends `${infer A}.${infer B}` ? JsonPath<JsonPath<T, A>, B>
// 	: JsonGet<T, K>;

// export function useDataRef<K extends string, T = JsonPath<PKGame, `data.${K}`>>(game: PKGame, key: K, def: T) {
// 	let target = key.split('.').reduce<any>((v, k) => v[k] ?? (v[k] = {}, v[k]), game);
// 	return toRef(target, key.split('.').pop()!, def);
// }

// export function useLocalStorageSave<T>(key: string) {
// 	return {
// 		save(v: T) {
// 			localStorage.setItem(key, JSON.stringify(v));
// 		},
// 		load(v: T) {
// 			const data = JSON.parse(localStorage.getItem(key) ?? '{}');
// 			/** priority to newer id different type */
// 			function deepAssign(target: any, source: any) {
// 				for (let k in source) {
// 					if (typeof target[k] == 'undefined') {
// 						target[k] = source[k];
// 						continue;
// 					}
// 					if (typeof source[k] != typeof target[k]) {
// 						continue;
// 					}
// 					if (typeof source[k] != 'object') {
// 						target[k] = source[k];
// 					} else {
// 						deepAssign(target[k], source[k]);
// 					}
// 				}
// 				return target;
// 			}
// 			return deepAssign(v, data);
// 		},
// 	}
// }

// export function defineValue<T, K extends keyof T>(o: T, p: K, v?: T[K]) {
// 	Object.defineProperty(o, p, {
// 		value: v,
// 		configurable: true,
// 		enumerable: false,
// 		writable: true,
// 	});
// 	return o[p];
// }

// /** rounding down, over 1e4 */
// export function KMBFormat(n: number) {
// 	const suffixes = 'K,M,B,T'.split(',');
// 	if (n < 1e4) return n.toFixed(4).replace(/\.?0+$/, '').slice(0, 4).replace(/\.$/, '');
// 	let [s, a, b, e] = n.toExponential(4).match(/(\d+)\.(\d+)e\+(\d+)/) || suffixes;
// 	a += b;
// 	let pow = +e;
// 	let mod = pow % 3;
// 	let div = ~~(pow / 3);
// 	a = a.slice(0, 1 + mod) + '.' + a.slice(1 + mod);
// 	s = suffixes[div - 1] || 'e' + (div * 3);
// 	return `${a.slice(0, 5)}${s}`;
// }

// export const debug = reactive({
// 	tabs: true,
// });
