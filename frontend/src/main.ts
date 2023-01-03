import { createApp } from "vue"
import App from "./App.vue"
import router from "./router"
import { session } from "./data/session"

import {
	Button,
	Badge,
	Input,
	setConfig,
	frappeRequest,
	pageMetaPlugin,
	resourcesPlugin,
} from "frappe-ui"

import { IonicVue } from "@ionic/vue"

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css"

// /* Theme variables */
import "./theme/variables.css"

import "./main.css"
import { userResource } from "./data/user"
import {
	sessionInjectionKey,
	userResourceInjectionKey,
} from "./typing/InjectionKeys"

import { createI18n } from "vue-i18n"

// Import messages
import messages from "@intlify/unplugin-vue-i18n/messages"

const i18n = createI18n({
	legacy: false,
	locale: "en",
	fallbackLocale: "en",
	messages,
})

const app = createApp(App)
setConfig("resourceFetcher", frappeRequest)
app.use(resourcesPlugin)
app.use(pageMetaPlugin)
app.use(router)

app.use(IonicVue)

app.component("Button", Button)
app.component("Badge", Badge)
app.component("Input", Input)

app.provide(sessionInjectionKey, session)
app.provide(userResourceInjectionKey, userResource)

router.isReady().then(() => {
	app.mount("#app")
})

// Internationalization
app.use(i18n)
