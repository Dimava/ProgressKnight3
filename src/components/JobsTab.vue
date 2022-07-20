<template>
	<Grid id="jobs" cols="9 4 7 5 3 4" class="gridList">
		<template v-for="cat of jobCategories">
			<GridRow class="categoryHeader" :category="cat">
				<Cell> {{ cat.slice(2) }} </Cell>
				<Cell> Level </Cell>
				<Cell> Income/day </Cell>
				<Cell> Xp req </Cell>
				<Cell> Xp/day </Cell>
				<Cell> Max level </Cell>
			</GridRow>
			<GridRow v-for="job in jobs.filter(e => e.category == cat)" class="job"
				:class="{ selected: data.currentJob == job.id }">
				<Cell class="pl-12 pr-24">
					<ProgressBar @click="game.selectJob(job.id)" class="p5" :progress="job.currentExp.value"
						:max="job.currentExpReq">
						{{ job.name }}
					</ProgressBar>
				</Cell>
				<Cell> {{ job.currentLevel }} </Cell>
				<Cell>
					<Money :money="job.currentIncome" />
				</Cell>
				<Cell> {{ ~~job.currentExp }} / {{ job.currentExpReq }} </Cell>
				<Cell> +{{ job.currentExpGain }} </Cell>
				<Cell> {{ job.maxLevelReached }} </Cell>
			</GridRow>
		</template>
	</Grid>
</template>

<script setup lang="ts" name="JobsTab">
import { toRef, computed } from 'vue';
import { useGame } from './game';


const { game, data } = useGame();

const paused = toRef(data, 'paused');

const jobs = computed(() => Object.values(game.jobs));
const jobCategories = computed(() => Array.from(new Set(jobs.value.map(e => e.category))));

</script>

<style>

.gridList .categoryHeader>* {
	background-color: red;
	padding: 8px;
	border-top-width: 0;
}
.gridList .categoryHeader+*>* {
	border-top-width: 0;
    white-space: pre-line;
}

.gridList {
	background-color: #333;
	width: 1000px;
	margin: 8px 12px;
}

.gridList>*>* {
	padding: calc(8px + 5px) 8px;
	border-top: 1px solid #777;
}

.gridList>.categoryHeader>* {
	padding: 8px;
}

.gridList>*>*:nth-child(1) {
	padding: 8px 36px 8px 16px;
}

.gridList>.selected progress-bar {
	--fg: orange;
	outline: 1px solid #777;
}


</style>