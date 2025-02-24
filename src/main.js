import { createApp } from 'vue';
import { Quasar } from 'quasar';
import { router } from './router';
import App from './App.vue';

import 'quasar/src/css/index.sass';
import './assets/styles/main.css';

const app = createApp(App);
app.use(Quasar);
app.use(router);

app.mount('#app');
