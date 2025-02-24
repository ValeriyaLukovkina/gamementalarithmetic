<script setup>
import { ref, computed, onMounted } from 'vue';

const statistics = ref({
  decided: 0,
  all: 0,
});

const gameSettings = ref({
  duration: 5,
  difficulty: 5,
  modes: ['addition'],
});

const confirmDelete = ref(false);

const accuracy = computed(() => {
  if (statistics.value.all === 0) return 100;
  return Math.round((statistics.value.decided / statistics.value.all) * 100);
});

const clearStatistics = () => {
  statistics.value = { decided: 0, all: 0 };
  localStorage.removeItem('userData');
};

onMounted(() => {
  const savedStats = JSON.parse(localStorage.getItem('userData')) || { decided: 0, all: 0 };
  const savedSettings = JSON.parse(localStorage.getItem('gameSettings')) || {
    duration: 5,
    difficulty: 5,
    modes: ['addition'],
  };

  statistics.value = savedStats;
  gameSettings.value = savedSettings;
});
</script>

<template>
  <q-page class="q-pa-md">
    <h2 class="text-h5 q-mb-md">Game Overview</h2>

    <!-- Статистика пользователя -->
    <q-card class="q-mb-md">
      <q-card-section>
        <h3 class="text-h6">Your Statistics</h3>
        <p>
          Total solved: <strong>{{ statistics.decided }}</strong> /
          <strong>{{ statistics.all }}</strong>
        </p>
        <p>
          Accuracy: <strong>{{ accuracy }}%</strong>
        </p>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn color="negative" label="Clear Statistics" @click="confirmDelete = true" />
      </q-card-actions>
    </q-card>

    <!-- Подтверждение удаления статистики -->
    <q-dialog v-model="confirmDelete">
      <q-card>
        <q-card-section class="row items-center">
          <q-icon name="warning" color="negative" size="2rem" />
          <span class="q-ml-md">Are you sure you want to delete your statistics?</span>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn color="negative" label="Delete" @click="clearStatistics" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Текущие настройки игры -->
    <q-card class="q-mb-md">
      <q-card-section>
        <h3 class="text-h6">Current Game Settings</h3>
        <p>
          Duration: <strong>{{ gameSettings.duration }} min</strong>
        </p>
        <p>
          Difficulty: <strong>{{ gameSettings.difficulty }}</strong>
        </p>
        <p>
          Modes: <strong>{{ gameSettings.modes.join(', ') }}</strong>
        </p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped>
.q-card {
  padding: 12px;
}
</style>
