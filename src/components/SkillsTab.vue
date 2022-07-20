<template>
	<Grid id="skills" cols="9 4 7 5 3 4" class="gridList">
		<!-- <template v-for="cat of skillCategories">
			<GridRow class="categoryHeader" :category="cat">
				<Cell> {{ cat.slice(2) }} </Cell>
				<Cell> Level </Cell>
				<Cell> Effect </Cell>
				<Cell> Xp req </Cell>
				<Cell> Xp/day </Cell>
				<Cell> Max level </Cell>
			</GridRow>
			<GridRow v-for="skill in skills.filter(e => e.category == cat)" class="skill"
				:class="{ selected: data.currentSkill == skill.id }">
				<Cell class="pl-12 pr-24">
					<ProgressBar @click="game.selectSkill(skill.id)" class="p5" :progress="skill.currentExp.value"
						:max="skill.currentExpReq">
						{{ skill.name }}
					</ProgressBar>
				</Cell>
				<Cell> {{ skill.currentLevel }} </Cell>
				<Cell>
					{{ skill.effectText }}
				</Cell>
				<Cell> {{ KMBTFormat(skill.currentExp.value) }} / {{ skill.currentExpReq }} </Cell>
				<Cell> +{{ KMBTFormat(skill.currentExpGain) }} </Cell>
				<Cell> {{ skill.maxLevelReached }} </Cell>
			</GridRow>
		</template> -->
		skills broken atm
	</Grid>
</template>

<script setup lang="ts" name="SkillsTab">
import { toRef, computed } from 'vue';
import { Character } from '../game/character';
import { jobCategoryIds } from '../game/data'

const props = defineProps<{
	char: Character
}>();

const jobs = computed(() => Object.values(props.char.jobs))

</script>
