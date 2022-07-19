


import { useI18n } from 'vue-i18n';
import en from './en';

type en = typeof en;


export function useT() {
	const { t } = useI18n<false>({ inheritLocale: true });
	return t
}

type UnionToIntersection<U> =
	(U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

type Get<O, K> = O extends { [k in K & string]: any } ? O[K & string] : never;

type DeepGet<O, K> =
	| K extends `${infer A}.${infer B}` ? DeepGet<DeepGet<O, A>, B>
	: Get<O, K>

// type DeepKeys<T> = 
// | {
// 	[K in keyof T]: T[K] extends string ? K : `${K&string}.${DeepKeys<T[K]>}`
// }[keyof T]

type A<T> = {
	[K in keyof T as K extends string ? K | `-${K}` : never]: T[K]
}

type _ = DeepGet<en, 'label.level'>