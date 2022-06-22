<template>
	<component :is="tag?.toUpperCase() || 'GRID'" class="grid">
		<slot></slot>
	</component>
</template>


<script setup lang="ts" name="Grid">
import { ref } from 'vue';

defineProps<{
	tag?: string;
	// areas?: string;
	// cols?: string;
	// rows?: string;
}>()

</script>

<script lang="ts" name="Grid">
import { useStyle } from './tw';
const { addStyle, styleAttr } = useStyle();

export default {
	name: 'Grid',
};

styleAttr('areas', (val) => {
	const rows = val.match(/\w+/g);
	if (!rows) return;
	return `
		[areas="${val}"] {
			grid-template-areas: ${rows.map(e => `"${e.split('').join(' ')}"`).join(' ')};
		}
	`;
})
styleAttr('areas', (val) => {
	const chars = val.match(/\w/g);
	if (!chars) return;
	return chars.map(c => `
		*[area="${c}"] {
			grid-area: ${c};
		}
	`);
})
styleAttr('cols', (val) => {
	const chars = val.match(/\w/g);
	if (!chars) return;
	const cols = +val ? '1fr '.repeat(+val)
		: val.split(' ').map(e => +e ? e + 'fr' : e).join(' ')
	return `
		*[cols="${val}"] {
			grid-template-columns: ${cols};
		}
	`;
})
styleAttr('rows', (val) => {
	const chars = val.match(/\w/g);
	if (!chars) return;
	const rows = +val ? '1fr '.repeat(+val)
		: val.split(' ').map(e => +e ? e + 'fr' : e).join(' ')
	return `
		*[rows="${val}"] {
			grid-template-rows: ${rows};
		}
	`;
})
</script>
