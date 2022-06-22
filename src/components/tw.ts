import { useMutationObserver } from "@vueuse/core";
import { computed } from "vue";


type a1 = true extends boolean ? 1 : 0;
type a2 = boolean extends true ? 1 : 0;

function useAttrMutation<N extends boolean = false>(
	attr: string, cb: (val: string | (true extends N ? null : never), attr: string, el: HTMLElement) => void,
	immediate = true,
	allowNull?: N
): void {
	useMutationObserver(document.body, mm => mm.forEach(onMutation), {
		attributeFilter: [attr],
		childList: true,
		subtree: true,
	});
	if (immediate) {
		apply([document.body], true, true);
		immediate = false;
	}
	function onMutation(m: MutationRecord) {
		if (m.type == 'attributes') {
			apply([m.target], false, false);
		}
		if (m.type == 'childList') {
			apply([...m.addedNodes], true, true);
		}
	}

	function apply(nodes: Node[], check = false, deep = false) {
		let els = nodes.filter(e => e instanceof HTMLElement) as HTMLElement[];
		if (deep) {
			for (let e of els) {
				apply([...e.querySelectorAll(`[${attr}]`)], false, false);
			}
		}
		if (check) {
			els = els.filter(e => e.hasAttribute(attr));
		}
		for (let e of els) {
			callback(e);
		}
	}

	function callback(el: HTMLElement) {
		let val = el.getAttribute(attr);
		if (val == null && !allowNull) return;
		// console.log(`${attr}:${val}${immediate ? '@immediate' : ''}`, el);
		cb(val!, attr, el);
	}
}

const style = computed(() => {
	let s = document.createElement('style');
	s.id = 'tw-style';
	document.head.append(s);
	return s;
})
const stylesMap = new Set();

const stylesSet = new Set();

function addStyle(s: MaybeArray<string | undefined>) {
	if (!s) return;
	if (Array.isArray(s)) return s.forEach(addStyle);
	s = s.replaceAll(/\s+/g, ' ');
	if (stylesSet.has(s)) return;
	stylesSet.add(s);
	// console.log(s);
	style.value.sheet?.insertRule(s);
}

type MaybeArray<T> = T | T[]

export function useStyle() {
	return {
		addStyle,
		styleAttr(attr: string, styler: (val: string, attr: string, el: HTMLElement) => MaybeArray<string> | void) {
			useAttrMutation(attr, (v, a, e) => {
				let s = styler(v, a, e);
				s && addStyle(s);
			});
		}
	}
}

const twMatcherGroups: Record<string, string> = {
	'<p>': '(?:\\d+(px|em|%|[a-z][a-z]|))',
	'<p12>': '(?:<p>(-<p>))',
	'<p14>': '(?:<p>(-<p>)?(-<p>)?(-<p>)?)',
}
const twMatcherOps = {
	parseMatcherKey: function parse(k: string) {
		const cache = (parse as any).cache ??= new Map();
		if (cache.has(k)) return cache.get(k);
		let v = k;
		for (let g in twMatcherGroups) {
			for (let g in twMatcherGroups) {
				v = v.replaceAll(g, twMatcherGroups[g])
			}
		}
		cache.set(k, v);
		return v;
	}
}

function ntopx(s: string) {
	return s.replaceAll(/-?(\d+)(px|x|\w|%|)/g, (s, d, x) => ` ${d}${x == 'x' ? '00%' : x ? x : 'px'
		}`);
}
const bmt: Record<string, string> = {
	b: 'bottom', m: 'middle', t: 'top',
	l: 'left', c: 'center', r: 'right',
	undefined: '', '': '',
}

const s = (s: string, cv: (s: string) => string = a => a) => (cls: string, ...a: string[]) => a.reduce((v, e, i) => v.replaceAll(`$${i + 1}`, cv(e)), s)

const twRawMatchers: Record<string, (...a: string[]) => string> = {
	grid: () => `display: grid;`,
	flex: () => `display: flex;`,
	contents: () => `display: contents;`,
	'b|block': () => `display: block;`,
	pre: () => `white-space: pre;`,

	'bg-(\\w+)': (cls, cl) => `background: ${cl.match(/^([\da-f]{3}|[\da-f]{6})$/i) ? '#' : ''}${cl};`,
	'tc-(\\w+)': (cls, cl) => `color: ${cl.match(/^([\da-f]{3}|[\da-f]{6})$/i) ? '#' : ''}${cl};`,
	'bc-(\\w+)': (cls, cl) => `border-color: ${cl.match(/^([\da-f]{3}|[\da-f]{6})$/i) ? '#' : ''}${cl};`,

	'b-?(\\d+)': (cls, n) => `border: ${n}px solid black;`,
	'p-?(<p14>)': (cls, n) => `padding: ${ntopx(n)};`,
	'm-?(<p14>)': (cls, n) => `margin: ${ntopx(n)};`,

	'fs-?(<p>)': (cls, n) => `font-size: ${ntopx(n)}`,

	'minw-?(<p>)': (cls, n) => `min-width: ${ntopx(n)}`,
	'center': (cls, n) => `text-align: center`,
	'ta-([bmt]|)([lcr]|)': (cls, v, h) => `${v && 'vertical-align: ' + bmt[v]}; ${h && 'text-align: ' + bmt[h]};`,
	'lh-?(\\d+)': (cls, n) => `line-height: ${n};`,

	'h-?(<p>)': s('height: $1;', ntopx),
	'w-?(<p>)': s('width: $1;', ntopx),
	'minh-?(<p>)': s('min-height: $1', ntopx),
	'gap-?(<p12>)': s('grid-gap: $1', ntopx),

	'pl-?(<p>)': s('padding-left: $1;', ntopx),
	'pr-?(<p>)': s('padding-right: $1;', ntopx),
	'bb-?(\\d+)': (cls, n) => `border-bottom: ${n}px solid black;`,
}

const knownClassesSet = new Set();

useStyle().styleAttr('class', (val, attr, el) => {
	for (let cls of el.classList) {
		if (knownClassesSet.has(cls)) continue;
		knownClassesSet.add(cls);
		// console.log({ cls })

		let hover = '';
		let mcls = cls;
		if (cls.startsWith('h:')) {
			hover = ':hover';
			mcls = mcls.slice(2);
		}
		cls = cls.replaceAll(':', '\\:');
		cls = cls.replaceAll('%', '\\%');

		for (let [key, styler] of Object.entries(twRawMatchers)) {
			key = twMatcherOps.parseMatcherKey(key);
			const m = mcls.match(new RegExp(`^(?:${key})$`));
			if (m) {
				addStyle(`.${cls}${hover} { ${styler(...m as string[])} }`)
			}
		}
	}
})
