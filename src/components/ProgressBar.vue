<template>
	<PROGRESS-BAR :style="style">
		<slot></slot>
	</PROGRESS-BAR>
</template>

<script setup lang="ts" name="ProgressBar">
import { MaybeRef } from '@vueuse/shared';
import { computed, toRef, unref } from 'vue'

const props = defineProps<{
	progress: MaybeRef<number>;
	max?: MaybeRef<number>;
}>();

const progress = computed(() =>
	Math.min(1, unref(props.progress) / unref(props.max || 1))
)

const style = computed(() => ({
	'--pc': progress.value * 100 + '%',
}))

</script>

<style>
progress-bar {
	display: block;

	/* --pc: 0%; */
	--fg: #2e94e7;
	--bg: #0c65ad;
	background: linear-gradient(90deg,
			var(--fg) 0%,
			var(--fg) var(--pc),
			var(--bg) var(--pc),
			var(--bg) 100%);
	/* transition: --pc 0.4s; */
}

/* @property --pc {
	syntax: "<percentage>";
	initial-value: 0%;
	inherits: false;
} */


</style>