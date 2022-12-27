import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import {FrappeUI, Button, Badge} from 'frappe-ui';

import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Theme variables */
import './theme/variables.css';


import './main.css';

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(FrappeUI);

app.component('Button', Button);
app.component('Badge', Badge);
  
router.isReady().then(() => {
  app.mount('#app');
});