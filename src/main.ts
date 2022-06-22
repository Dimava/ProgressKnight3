import './game/types'


import Cell from './components/Cell.vue';
import Grid from './components/Grid.vue';
import GridRow from './components/GridRow.vue';
import Money from './components/Money.vue';
import ProgressBar from './components/ProgressBar.vue';

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

[Cell, Grid, GridRow, Money, ProgressBar].map(e => {
	// console.log(e.name, e);
	app.component(e.name, e)
});

app.mount('#app')