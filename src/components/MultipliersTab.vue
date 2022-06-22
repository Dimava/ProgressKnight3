<template>
	<Grid id="multipliers" class="gridList w1000" cols="9 23">
		<GridRow class="categoryHeader">
			<Cell> Multiplier </Cell>
			<Cell> Value </Cell>
		</GridRow>
		<template v-for="multiplier in multipliers">
			<GridRow v-if="multiplier.multiplier != 1 || 1">
				<Cell class="pl-12 pr-24">
					<ProgressBar class="p5" :progress="0">
						{{ multiplier.name }}
					</ProgressBar>
				</Cell>
				<Cell> {{ multiplier.effectText }} </Cell>
			</GridRow>
		</template>
	</Grid>
</template>

<script setup lang="ts" name="MultipliersTab">
import { toRef, computed } from 'vue';
import { useGame } from '../game/game';


const { game, data } = useGame();

const multipliers = computed(() => Object.values(game.multipliers));

</script>
