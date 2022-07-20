import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import vuePluginYaml from "vite-plugin-yaml2";
import vueI18n from "@intlify/vite-plugin-vue-i18n";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue({
			template: {
				compilerOptions: {
					isCustomElement: (tag) => tag.toUpperCase() == tag,
				},
			},
		}),
		vueSetupExtend(),
		vueI18n({
			include: path.resolve(__dirname, "./src/locales/**"),
		}),
		vuePluginYaml(),
	],
	base: "",
});
