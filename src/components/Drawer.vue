<script setup>
import { computed } from 'vue';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);
const drawerValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});

const drawerClass = computed(() =>
  $q.dark.isActive ? 'bg-grey-9 text-white' : 'bg-grey-2 text-black',
);
</script>

<template>
  <q-drawer v-model="drawerValue" show-if-above bordered :class="drawerClass">
    <q-list>
      <q-item-label header class="text-grey-6 text-uppercase"> Меню </q-item-label>

      <q-item clickable v-ripple to="/" class="menu-item">
        <q-item-section avatar>
          <q-icon name="dashboard" color="grey-7" />
        </q-item-section>
        <q-item-section>Главная</q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/setting" class="menu-item">
        <q-item-section avatar>
          <q-icon name="settings" color="grey-7" />
        </q-item-section>
        <q-item-section>Настройки</q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/game" class="menu-item">
        <q-item-section avatar>
          <q-icon name="sports_esports" color="grey-7" />
        </q-item-section>
        <q-item-section>Игра</q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<style scoped>
.q-drawer {
  transition: all 0.3s ease;
}

.menu-item {
  transition: all 0.2s ease;
  border-radius: 8px;
}
.menu-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
  transform: scale(1.02);
}
</style>
