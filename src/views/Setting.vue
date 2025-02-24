<script setup>
import { reactive, onMounted } from 'vue';

const gameSettings = reactive({
  duration: 5,
  difficulty: 5,
  modes: ['addition'],
});

const tempSettings = reactive({ ...gameSettings });

const saveSettings = () => {
  Object.assign(gameSettings, tempSettings);
  localStorage.setItem('gameSettings', JSON.stringify(gameSettings));
};

onMounted(() => {
  const savedSettings = JSON.parse(localStorage.getItem('gameSettings'));
  if (savedSettings) {
    Object.assign(gameSettings, savedSettings);
    Object.assign(tempSettings, savedSettings);
  }
});
</script>

<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="settings-card">
      <q-card-section>
        <h2 class="text-h5 text-primary text-center">Game Settings</h2>
        <p class="text-grey-7 text-center">Customize your training session.</p>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <q-item>
          <q-item-section>
            <q-item-label class="text-bold">Game Duration (minutes)</q-item-label>
            <q-slider
              v-model="tempSettings.duration"
              :min="1"
              :max="15"
              color="primary"
              label
              label-always
              :marker-labels="[
                { value: 1, label: '1' },
                { value: 15, label: '15' },
              ]"
            />
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label class="text-bold">Difficulty Level</q-item-label>
            <q-slider
              v-model="tempSettings.difficulty"
              :min="1"
              :max="10"
              color="primary"
              label
              label-always
              :marker-labels="[
                { value: 1, label: 'Easy' },
                { value: 10, label: 'Hard' },
              ]"
            />
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <q-item-label class="text-bold">Game Modes</q-item-label>
            <div class="q-gutter-sm">
              <q-checkbox
                v-model="tempSettings.modes"
                val="addition"
                label="Addition"
                color="primary"
              />
              <q-checkbox
                v-model="tempSettings.modes"
                val="subtraction"
                label="Subtraction"
                color="primary"
              />
              <q-checkbox
                v-model="tempSettings.modes"
                val="multiplication"
                label="Multiplication"
                color="primary"
              />
              <q-checkbox
                v-model="tempSettings.modes"
                val="division"
                label="Division"
                color="primary"
              />
            </div>
          </q-item-section>
        </q-item>
      </q-card-section>

      <q-card-actions align="center">
        <q-btn color="primary" @click="saveSettings" label="Save Settings" class="full-width" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<style scoped>
.settings-card {
  max-width: 700px;
  margin: auto;
  padding: 16px;
}

.q-slider {
  margin-top: 10px;
}

.q-checkbox {
  margin: 4px 0;
}
</style>
