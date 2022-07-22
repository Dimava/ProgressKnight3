<template>
	<Grid id="multipliers" class="gridList w1000" cols="9 23">
		<GridRow class="categoryHeader">
			<Cell> Multiplier </Cell>
			<Cell> Value </Cell>
		</GridRow>
		<template v-for="mul in multis">
			<GridRow v-if="mul.multiplier != 1 || 1">
				<Cell class="pl-12 pr-24">
					<ProgressBar class="p5" :progress="0">
						{{ mul.name }}
					</ProgressBar>
				</Cell>
				<Cell> x{{ stable(mul.multiplier) }} {{ mul.name }} </Cell>
			</GridRow>
		</template>
	</Grid>
</template>

<script setup lang="ts" name="MultipliersTab">
import { toRef, computed } from "vue";
import { Character } from "../game/character";
import { multiplierIds } from "../game/data";
import { stableKMBTFormat as stable, KMBTFormat as kmbt } from "../game/lib";

const props = defineProps<{
	char: Character;
}>();

const multis = computed(() => Object.values(props.char.multipliers));
</script>
