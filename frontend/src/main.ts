import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import {
  Button,
  Badge,
  setConfig,
  frappeRequest,
  pageMetaPlugin,
  resourcesPlugin,
} from "frappe-ui";

import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

// /* Theme variables */
import "./theme/variables.css";

import "./main.css";

const app = createApp(App);
setConfig("resourceFetcher", frappeRequest);
app.use(resourcesPlugin);
app.use(pageMetaPlugin);
app.use(router);

app.use(IonicVue);

app.component("Button", Button);
app.component("Badge", Badge);

router.isReady().then(() => {
  app.mount("#app");
});
