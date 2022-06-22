import { computed, reactive, ref, unref } from 'vue';
import * as Vue from 'vue';

declare global {
	type Ref<T> = import('vue').Ref<T>;
	type ComputedRef<T> = import('vue').ComputedRef<T>
	type ToRefs<T> = import('vue').ToRefs<T>

	// const computed: typeof Vue.computed;
	// const ref: typeof Vue.ref;
	// const reactive: typeof Vue.reactive;
	// const unref: typeof Vue.unref;
}

Object.assign(globalThis, {
	computed,
	ref,
	reactive,
	unref,
})


export { };