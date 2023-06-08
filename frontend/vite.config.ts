import path from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite"
import { getProxyOptions } from "frappe-ui/src/utils/vite-dev-server"
import { webserver_port } from "../../../sites/common_site_config.json"


export default defineConfig({
	plugins: [
		vue(),
		VueI18nPlugin({
			include: "./src/locales/*.yaml",
		}),
	],
	server: {
		port: 8080,
		proxy: getProxyOptions({ port: webserver_port }),
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
			"tailwind.config.js": path.resolve(__dirname, "tailwind.config.js"),
		},
	},
	optimizeDeps: {
		include: [
			"feather-icons",
			"showdown",
			"tailwind.config.js",
			"engine.io-client",
		],
	},
	build: {
		outDir: "../changemakers/public/frontend",
		emptyOutDir: true,
		target: "es2015",
		commonjsOptions: {
			include: [/tailwind.config.js/, /node_modules/],
		},
	},
})
