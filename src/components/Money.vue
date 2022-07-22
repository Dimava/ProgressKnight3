<template>
	<MONEY>
		<span class="platinum num0" v-show="platin.show">{{ platin.space }}</span>
		<span class="platinum" v-show="platin.show">{{ platin.text }}</span>
		<span class="gold     num0" v-show="gold__.show">{{ gold__.space }}</span>
		<span class="gold    " v-show="gold__.show">{{ gold__.text }}</span>
		<span class="silver   num0" v-show="silver.show">{{ silver.space }}</span>
		<span class="silver  " v-show="silver.show">{{ silver.text }}</span>
		<span class="copper   num0" v-show="copper.show">{{ copper.space }}</span>
		<span class="copper  " v-show="copper.show">{{ copper.text }}</span>
	</MONEY>
</template>

<script setup lang="ts" name="Money">
import { computed, reactive, toRef } from 'vue';
import { KMBTFormat } from '../game/lib';

const props = withDefaults(defineProps<{
	money: number;
	precition: number;
}>(), {
	precition: 1e4,
});

const money = toRef(props, 'money');
const precition = computed(() => !props.precition ? 1e4 : props.precition ** (props.precition > 1 ? 1 : -1));

function useCoin(one: number, mod: number, postfix: string) {
	const coins = computed(() => Math.floor(money.value / one) % (mod || Infinity));
	const show = computed(() =>
		money.value < 1 ? postfix == 'c'
			: money.value < one ? 0
				: mod && money.value > one * mod * precition.value ? false
					: true);
	const space = computed(() => coins.value > 9 ? '' : mod && money.value > one * mod ? '0' : '\u2007' && '0');
	const text = computed(() => {
		return KMBTFormat(coins.value) + postfix + ' ';
	});
	return reactive({ coins, show, text, space });
}

const copper = useCoin(1e0, 100, 'c');
const silver = useCoin(1e2, 100, 's');
const gold__ = useCoin(1e4, 100, 'g');
const platin = useCoin(1e6, 0x0, 'p');

</script>

<style>
money {
	font-variant-numeric: tabular-nums;
	/* font-weight: bold; */
	display: inline-block;
}

.copper {
	color: #B87333;
}

.silver {
	color: silver;
}

.gold {
	color: gold;
}

.platinum {
	color: #E5E4E2;
}

.num0 {
	opacity: 0.5;
}
</style>