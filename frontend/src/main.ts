import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { session } from "./data/session"
import dayjs from "@/utils/dayjs"

import {
	Button,
	Badge,
	Input,
	setConfig,
	frappeRequest,
	pageMetaPlugin,
	resourcesPlugin,
	Card,
} from "frappe-ui"

import { IonicVue } from "@ionic/vue"

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css"

// /* Theme variables */
import "./theme/variables.css"

import "./main.css"
import { userResource } from "./data/user"
import {
	dayjsInjectionKey,
	sessionInjectionKey,
	userResourceInjectionKey,
} from "./typing/InjectionKeys"

import { createI18n } from "vue-i18n"

// Import messages from yaml files
import messages from "@intlify/unplugin-vue-i18n/messages"

const i18n = createI18n({
	legacy: false,
	locale: "en", // TODO: fetch from preferences later
	fallbackLocale: "en",
	messages,
})

const app = createApp(App)

// FrappeUI Config
setConfig("resourceFetcher", frappeRequest)
app.use(resourcesPlugin)
app.use(pageMetaPlugin)

app.component("Button", Button)
app.component("Badge", Badge)
app.component("Input", Input)
app.component("Card", Card)

app.use(router)
app.use(IonicVue)

// Globals
app.provide(sessionInjectionKey, session)
app.provide(userResourceInjectionKey, userResource)
app.provide(dayjsInjectionKey, dayjs)

app.config.globalProperties.$dayjs = dayjs

// Mount App
router.isReady().then(() => {
	app.mount("#app")
})

// Internationalization
app.use(i18n)
