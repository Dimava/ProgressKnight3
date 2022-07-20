<template>
	<Grid id="game" class="bg-222 tc-white p10 gap-10-10" tag="GAME" areas="tt as am" cols="300px 1fr"
		rows="auto auto 1fr">
		<header area="t">
			<h1 class="m10"> Progress Knight 3.0 </h1>
		</header>
		<aside area="a" class="bg-333 p-20 minh-40v ">

			<button class="pause" @click="paused = !paused">
				{{ paused ? 'Play' : 'Pause' }}
			</button> <br>

			<Money :money="data.money" /> <br>
			<Money :money="data.money ** 2" /> <br>
			<Money :money="data.money ** 3" /> <br>
			<Money :money="data.money ** 4" /> <br>
			<Money :money="data.money ** 5" /> <br>
			<Money :money="data.money ** 6" /> <br>

			<input type="number" v-model="data.money">

			aside
		</aside>
		<div id="tabs" area="s" class="flex">
			<div class="tab" v-for="t of tabs" @click="tab = t" :class="{ active: tab == t }"> {{ t }} </div>
		</div>
		<main area="m" class="b bg-333">
			<JobsTab v-show="tab == 'Jobs' || debug.tabs" />
			<SkillsTab v-show="tab == 'Skills' || debug.tabs" />
			<MultipliersTab v-show="tab == 'Multipliers' || debug.tabs" />
			<button @click="game.save"> save </button>
			<button @click="game.load"> load </button>
		</main>
	</Grid>
	<pre>
		{{ game }}
	</pre>

</template>

<script setup lang="ts" name="ProgressKnight">
import { toRef, computed, ref } from 'vue';
import { useGame } from './game';
import JobsTab from './JobsTab.vue';
import SkillsTab from './SkillsTab.vue';
import MultipliersTab from './MultipliersTab.vue';
import { debug } from './lib'


const tabs = ['Jobs', 'Skills', 'Multipliers'];

const { game, data } = useGame();

const tab = ref('Jobs');

const paused = toRef(data, 'paused');

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

.pause:hover {
	background-color: #777;
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