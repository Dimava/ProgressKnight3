import {
	DefineLocaleMessage,
	DefineDateTimeFormat,
	DefineNumberFormat
} from 'vue-i18n'
import en from './en';
type K = keyof typeof en;

declare module 'vue-i18n' {
	// define the locale messages schema
	export interface DefineLocaleMessage {
		jobs: typeof en['jobs']
		// hello: string
		// menu: {
		// 	login: string
		// }
		// errors: string[]
	}

	// // define the datetime format schema
	// export interface DefineDateTimeFormat {
	// 	short: {
	// 		hour: 'numeric'
	// 		minute: 'numeric'
	// 		second: 'numeric'
	// 		timeZoneName: 'short'
	// 		timezone: string
	// 	}
	// }

	// // define the number format schema
	// export interface DefineNumberFormat {
	// 	currency: {
	// 		style: 'currency'
	// 		currencyDisplay: 'symbol'
	// 		currency: string
	// 	}
	// }
}