<script setup>
import { ref } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const darkMode = ref($q.dark.isActive);

const toggleTheme = () => {
  darkMode.value = !darkMode.value;
  $q.dark.set(darkMode.value);
};
</script>

<template>
  <q-header elevated :class="darkMode ? 'bg-grey-9 text-white' : 'bg-grey-3 text-black'">
    <q-toolbar>
      <q-btn flat round dense icon="menu" class="q-mr-sm" @click="$emit('toggle-drawer')" />

      <q-toolbar-title class="text-center">
        <q-icon name="sports_esports" size="sm" class="q-mr-sm" />
        Game App
      </q-toolbar-title>

      <q-btn flat round dense :icon="darkMode ? 'dark_mode' : 'light_mode'" @click="toggleTheme" />
    </q-toolbar>
  </q-header>
</template>
