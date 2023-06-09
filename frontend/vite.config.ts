import path from "path"
import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite"
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

function getProxyOptions({ port }) {
    return {
      '^/(app|login|api|assets|files|private)': {
        target: `http://localhost:${port}`,
        ws: true,
        router: function (req) {
          const site_name = req.headers.host.split(':')[0]
          return `http://${site_name}:${port}`
        },
      },
    }
  }