<script setup>
import { ref } from 'vue';
import HeaderComponent from './components/Header.vue';
import Drawer from './components/Drawer.vue';

const drawer = ref(false);

const toggleDrawer = () => {
  drawer.value = !drawer.value;
};
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <HeaderComponent @toggle-drawer="toggleDrawer" />
    <Drawer v-model="drawer" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
