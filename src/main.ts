import './game/types'


import Cell from './components/Cell.vue';
import Grid from './components/Grid.vue';
import GridRow from './components/GridRow.vue';
import Money from './components/Money.vue';
import ProgressBar from './components/ProgressBar.vue';

import { createApp } from 'vue'
import App from './App.vue'

import { createI18n, useI18n } from 'vue-i18n'

import en from './locales/en'

const i18n = createI18n<false>({
	legacy: false,
	locale: 'en',
	// messages
	messages: {
		en,
	},
})

// const { t, n } = useI18n<{message: typeof en}>({ inheritLocale: true })
// t('jobs.qwe')

// i18n.global.t('jobs.qwe')

const app = createApp(App);

;[Cell, Grid, GridRow, Money, ProgressBar].map(e => {
	// console.log(e.name, e);
	app.component(e.name, e)
});

app.mount('#app')