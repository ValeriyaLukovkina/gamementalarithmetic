import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'
import { Quasar } from 'quasar'
// import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'

import App from './App.vue'
// import Game from './components/Game.vue'
// import Setting from './components/Setting.vue'

import './assets/main.css'
import { router } from './router'

// const Game = { template: '<div>Game</div>' }
// const Setting = { template: '<div>Setting</div>' }

// const routes = [
//     { path: '/', component: Setting },
//     { path: '/game', component: Game }
// ];

// const router = createRouter({
//     history: createWebHistory(),
//     routes
// })

const app = createApp(App)
app.use(Quasar, {
    plugins: {}
  })
app.use(router)

app.mount('#app')

// createApp(App).mount('#app')
