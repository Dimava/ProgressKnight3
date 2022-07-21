<template>
	<Grid id="game" class="bg-222 tc-white p10 gap-10-10" tag="GAME" areas="tt as am" cols="300px 1fr"
		rows="auto auto 1fr">
		<header area="t">
			<h1 class="m10">Progress Knight 3.0</h1>
		</header>
		<aside area="a" class="bg-333 p-20 minh-40v">
			<button class="pause" @click="paused = !paused">
				{{ paused ? "Play" : "Pause" }}
			</button>
			<br />
			<button class="saveload" @click="save">Save</button>
			<button class="saveload" @click="load">Load</button>
			<button class="saveload" @click="reset">Reset</button>
			<br />

			<Money :money="char.saved.money" /> <br />
			<Money :money="char.saved.money ** 2" /> <br />
			<Money :money="char.saved.money ** 3" /> <br />
			<Money :money="char.saved.money ** 4" /> <br />
			<Money :money="char.saved.money ** 5" /> <br />
			<Money :money="char.saved.money ** 6" /> <br />

			$<input type="number" v-model="char.saved.money" />
			<br>
			gameSpeed: <input type="number" v-model="gameSpeed" />
		</aside>
		<div id="tabs" area="s" class="flex">
			<div class="tab" v-for="(tab, name) in tabs" @click="tab.active = !tab.active"
				:class="{ active: tab.active }">
				{{ name }}
			</div>
		</div>
		<main area="m" class="b bg-333">
			<JobsTab :char="char" v-show="tabs.Jobs.active" />
			<SkillsTab :char="char" v-show="tabs.Skills.active" />
			<MultipliersTab :char="char" v-show="tabs.Multipliers.active" />
		</main>
	</Grid>
	<!-- <pre style="color: white">
		{{ char }}
	</pre> -->
</template>

<script setup lang="ts" name="ProgressKnight">
import { reactive, ref, toRef } from "vue";
import { char, charsave, gameSpeed } from "../game/game";
import JobsTab from "./JobsTab.vue";
import SkillsTab from "./SkillsTab.vue";
import MultipliersTab from "./MultipliersTab.vue";
const paused = toRef(char.saved, 'paused');
const { save, load, reset } = charsave;

const tabs = reactive({
	Jobs: { active: true },
	Skills: { active: true },
	Multipliers: { active: true },
});
</script>

<style>
:root {
	--deep-background: #222;
	--panel-background: #333;
}

body {
	background-color: var(--deep-background);
}

#game {
	display: inline-grid;
}

.pause {
	color: white;
	background-color: #555;
	width: 100px;
	height: 2em;
	display: block;
	border-color: #ccc;
	outline: 0;
}

.pause:hover,
.saveload:hover {
	background-color: #777;
}

.saveload {
	display: inline-block;
	width: 30%;
	background-color: #555;
	height: 2em;
	border-color: #ccc;
	outline: 0;
}

#tabs {
	background: var(--panel-background);
}

.tab {
	display: block;
	min-width: 100px;
	text-align: center;
	padding: 8px 0;
	line-height: 1;
	margin-right: 4px;
}

.tab:hover {
	background-color: #777;
}

.tab.active {
	background-color: #777;
}
</style>
