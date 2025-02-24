import { createRouter, createWebHistory } from "vue-router";
import Setting from '../views/Setting.vue';
import Game from '../views/Game.vue';
import Home from '../views/Home.vue';

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/setting",
      name: "Setting",
      component: Setting,
    },
    {
      path: "/game",
      name: "Game",
      component: Game,
    },
  ],
});
