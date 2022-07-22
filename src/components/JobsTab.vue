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
			<GridRow v-for="job in jobs.filter((e) => e.category == cat)" class="job"
				:class="{ selected: char.saved.currentJob == job.id }">
				<template v-if="job.isUnlocked">
					<Cell class="pl-12 pr-24">
						<ProgressBar :title="job.desc" @click="job.select()" class="p5" :progress="job.currentExp"
							:max="job.currentExpReq">
							{{ job.name }}
						</ProgressBar>
					</Cell>
					<Cell> {{ job.currentLevel }} </Cell>
					<Cell>
						<Money v-if="job.isUnlocked" :money="job.currentIncome" />
					</Cell>
					<Cell>
						{{ stable(job.currentExp) }} /
						{{ kmbt(job.currentExpReq) }}
					</Cell>
					<Cell> +{{ kmbt(job.currentExpGain) }} </Cell>
					<Cell> {{ job.maxLevelReached }} </Cell>
				</template>
				<template v-else>
					<Cell class="pl-12 pr-24">
						<ProgressBar :title="job.desc" class="p5 unmet-progress" :progress="jobUnlockProgress(job)">
							{{ job.name }}
						</ProgressBar>
					</Cell>
					<Cell colspan="4">
						<span v-for="(xpl, id) in job.explainRequirements()"
							:class="`${xpl?.met ? '' : 'un'}met-requirement`">
							<template v-if="!xpl" />
							<div class="iblk" v-else-if="xpl.source instanceof Job">
								{{ xpl.source.name ?? id }}: {{ xpl.value }}/{{ xpl.target }}&nbsp;
							</div>
							<div class="iblk" v-else-if="xpl.source instanceof Skill">
								{{ xpl.source.name ?? id }}: {{ xpl.value }}/{{ xpl.target }}&nbsp;
							</div>
							<div class="iblk" v-else-if="xpl.source instanceof Multiplier">
								{{ xpl.source.name ?? id }}: {{ stable(xpl.value) }}/{{ stable(xpl.target) }}&nbsp;
							</div>
							<div class="iblk" v-else-if="id == 'money'">
								Money:
								<Money :money="xpl!.target" />
							</div>
						</span>
					</Cell>
					<Cell> {{ job.maxLevelReached }} </Cell>
				</template>
			</GridRow>
		</template>
		<span v-if="!char.saved.currentJob"> Select a job! </span>
	</Grid>
</template>

<script setup lang="ts" name="JobsTab">
import { toRef, computed } from "vue";
import { Character } from "../game/character";
import { Job, jobCategoryIds, Multiplier, Skill } from "../game/data";
import { stableKMBTFormat as stable, KMBTFormat as kmbt } from "../game/lib";
import Money from "./Money.vue";

const props = defineProps<{
	char: Character;
}>();

const jobs = computed(() => Object.values(props.char.jobs));

function jobUnlockProgress(job: Job): number {
	let target = 0,
		value = 0;
	const explain = job.explainRequirements();
	for (let [id, xpl] of Object.entries(explain)) {
		target++;
		value += xpl.met ? 1 : xpl.value / xpl.target;
	}
	return value / target;
}
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

.unmet-requirement {
	opacity: 0.5;
}

.met-requirement {
	opacity: 0.5;
	color: greenyellow;
}

.unmet-progress {
	/* --bg: transparent; */
	--fg: hsl(207, 87%, 30%);
	--bg: hsl(207, 87%, 20%);
	color: #aaa;
}

.iblk {
	display: inline-block;
}
</style>
