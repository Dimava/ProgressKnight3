<template>
	<Grid id="skills" cols="9 4 7 5 3 4" class="gridList">
		<template v-for="cat of skillCategoryIds">
			<GridRow class="categoryHeader" :category="cat">
				<Cell> {{ cat }} </Cell>
				<Cell> Level </Cell>
				<Cell> Effect </Cell>
				<Cell> Xp req </Cell>
				<Cell> Xp/day </Cell>
				<Cell> Max level </Cell>
			</GridRow>
			<GridRow v-for="skill in skills.filter(e => e.category == cat)" class="skill"
				:class="{ selected: char.saved.currentSkill == skill.id }">
				<Cell class="pl-12 pr-24">
					<ProgressBar @click="skill.select()" class="p5" :progress="skill.saved.currentExp"
						:max="skill.currentExpReq">
						{{ skill.name }}
					</ProgressBar>
				</Cell>
				<Cell> {{ skill.saved.currentLevel }} </Cell>
				<Cell>
					<div v-for="(eff, id) of skill.currentEffects">
						x{{ stable(eff!) }} {{ id }}
					</div>
				</Cell>
				<Cell> {{ stable(skill.saved.currentExp) }} / {{ kmbt(skill.currentExpReq) }} </Cell>
				<Cell> +{{ stable(skill.currentExpGain) }} </Cell>
				<Cell> {{ skill.saved.maxLevelReached }} </Cell>
			</GridRow>
		</template>
		<span v-if="!char.saved.currentSkill"> Select a skill! </span>
	</Grid>
</template>

<script setup lang="ts" name="SkillsTab">
import { toRef, computed } from 'vue';
import { Character } from '../game/character';
import { skillCategoryIds } from '../game/data'
import { stableKMBTFormat as stable, KMBTFormat as kmbt } from '../game/lib';

const props = defineProps<{
	char: Character
}>();

const skills = computed(() => Object.values(props.char.skills))

</script>

<style>
.nobr {
	white-space: nowrap;
}
</style>