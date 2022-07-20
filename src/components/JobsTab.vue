<template>
	<Grid id="jobs" cols="9 4 7 5 3 4" class="gridList">
		<template v-for="cat of jobCategoryIds">
			<GridRow class="categoryHeader" :category="cat">
				<Cell> {{ cat }} </Cell>
				<Cell> Level </Cell>
				<Cell> Income/day </Cell>
				<Cell> Xp req </Cell>
				<Cell> Xp/day </Cell>
				<Cell> Max level </Cell>
			</GridRow>
			<GridRow v-for="job in jobs.filter(e => e.category == cat)" class="job"
				:class="{ selected: char.saved.currentJob == job.id }">
				<Cell class="pl-12 pr-24">
					<ProgressBar :title="job.desc" @click="job.select()" class="p5" :progress="job.saved.currentExp"
						:max="job.currentExpReq">
						{{ job.name }}
					</ProgressBar>
				</Cell>
				<Cell> {{ job.saved.currentLevel }} </Cell>
				<Cell>
					<Money :money="job.currentIncome" />
				</Cell>
				<Cell> {{ stable(job.saved.currentExp) }} / {{ kmbt(job.currentExpReq) }} </Cell>
				<Cell> +{{ kmbt(job.currentExpGain) }} </Cell>
				<Cell> {{ job.saved.maxLevelReached }} </Cell>
			</GridRow>
		</template>
		<span v-if="!char.saved.currentJob"> Select a job! </span>
	</Grid>
</template>

<script setup lang="ts" name="JobsTab">
import { toRef, computed } from 'vue';
import { Character } from '../game/character';
import { jobCategoryIds } from '../game/data'
import { stableKMBTFormat as stable, KMBTFormat as kmbt } from '../game/lib';

const props = defineProps<{
	char: Character
}>();

const jobs = computed(() => Object.values(props.char.jobs))


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