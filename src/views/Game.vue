<script setup>
import { useRouter } from "vue-router";
import { onMounted, reactive, watch } from "vue";
import { add, formatDistanceStrict } from "date-fns";

const router = useRouter();

const refs = reactive({
  inputUser: "",
  fixedNumber: 0,
  time: "1:00",
  result: 1,
  mode: "",
  meanMode: "",
});

const meanModes = {
  addition: "+",
  subtraction: "-",
  multiplication: "×",
  division: "÷",
};

const set = reactive({
  duration: 1,
  difficulty: 1,
  modes: ["addition", "subtraction"],
});

onMounted(() => {
  Object.assign(set, JSON.parse(localStorage.getItem("gameSettings")) || {});
  startNewGame();
  onTimer();
});

watch(
  set,
  () => {
    localStorage.setItem("gameSettings", JSON.stringify(set));
  },
  { deep: true }
);

let idInterval;

const startNewGame = () => {
  if (set.modes.length === 0) {
    set.modes = ["addition"];
  }

  refs.mode = randomMode(set.modes);
  refs.meanMode = meanModes[refs.mode];

  const range = set.difficulty * 10;
  const firstNum = generateRandom(range);
  const answer = generateRandom(range) || 1; 

  refs.fixedNumber = firstNum;
  refs.result = calculateExpectedResult(firstNum, answer);
  refs.answer = answer;

  if (refs.mode === "division" && (refs.result === 0 || !Number.isInteger(refs.result))) {
    startNewGame();
    return;
  }

  refs.inputUser = "";
};

const calculateExpectedResult = (fixed, randomNumber) => {
  switch (refs.mode) {
    case "addition":
      return fixed + randomNumber;
    case "subtraction":
      return fixed - randomNumber;
    case "multiplication":
      return fixed * randomNumber;
    case "division":
      return Math.floor(fixed / randomNumber); 
    default:
      return fixed + randomNumber;
  }
};

const checkAnswer = () => {
  const userAnswer = Number(refs.inputUser);
  if (isNaN(userAnswer)) return;

  const isCorrect = userAnswer === refs.answer;
  saveGame(isCorrect);
  startNewGame();
};

const saveGame = (isCorrect) => {
  try {
    let userData = JSON.parse(localStorage.getItem("userData")) || { decided: 0, all: 0 };

    if (isCorrect) {
      userData.decided += 1;
    }
    userData.all += 1;

    localStorage.setItem("userData", JSON.stringify(userData));
  } catch (error) {
    console.error("Ошибка сохранения данных:", error);
  }
};

const randomMode = (modes) => modes[Math.floor(Math.random() * modes.length)];

const generateRandom = (limit = 10) => Math.floor(Math.random() * limit);

const onTimer = () => {
  const endTime = add(new Date(), { minutes: set.duration });

  idInterval = setInterval(() => {
    const diffSec = parseInt(formatDistanceStrict(new Date(), endTime, { unit: "second" }));

    if (diffSec <= 0) {
      clearInterval(idInterval);
      router.push({ name: "Home" });
    } else {
      const minutes = Math.floor(diffSec / 60);
      const seconds = diffSec % 60;
      refs.time = `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
    }
  }, 1000);
};

const cancel = () => {
  clearInterval(idInterval);
  router.push({ name: "Home" });
};
</script>

<template>
  <q-page class="q-pa-md flex flex-center">
    <q-card class="game-card">
      <q-card-section class="header">
        <q-btn class="header-btn" color="negative" label="Cancel" @click="cancel" />
        <q-input class="header-timer" disable outlined v-model="refs.time" />
      </q-card-section>

      <q-card-section class="equation-wrapper">
        <div class="equation">
          <span class="fixed-number">{{ refs.fixedNumber }}</span>
          <span class="operator">{{ refs.meanMode }}</span>
          <q-input
            class="equation-el no-spinner"
            v-model="refs.inputUser"
            @keyup.enter="checkAnswer"
            @input="refs.inputUser = refs.inputUser.replace(/[^0-9]/g, '')"
          />
          <span class="operator">=</span>
          <span class="fixed-number">{{ refs.result }}</span>
        </div>
      </q-card-section>

      <q-card-section>
        <div class="button-grid">
          <div class="button-row">
            <q-btn
              v-for="n in [1, 2, 3]"
              :key="n"
              class="btn"
              round
              color="primary"
              @click="refs.inputUser += n"
              >{{ n }}</q-btn
            >
          </div>
          <div class="button-row">
            <q-btn
              v-for="n in [4, 5, 6]"
              :key="n"
              class="btn"
              round
              color="primary"
              @click="refs.inputUser += n"
              >{{ n }}</q-btn
            >
          </div>
          <div class="button-row">
            <q-btn
              v-for="n in [7, 8, 9]"
              :key="n"
              class="btn"
              round
              color="primary"
              @click="refs.inputUser += n"
              >{{ n }}</q-btn
            >
          </div>
          <div class="button-row">
            <q-btn class="btn" round color="primary" @click="refs.inputUser += 0">0</q-btn>
            <q-btn class="btn control-btn" round color="secondary" @click="checkAnswer">OK</q-btn>
          </div>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<style scoped>
.game-card {
  max-width: 450px;
  margin: auto;
  padding: 16px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-btn {
  width: 100px;
}

.header-timer {
  width: 80px;
  text-align: center;
}

.equation-wrapper {
  text-align: center;
  margin-bottom: 16px;
}

.equation {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  font-size: 1.5rem;
  font-weight: bold;
}

.fixed-number {
  width: 50px;
  text-align: center;
}

.equation-el {
  width: 80px;
  text-align: center;
  font-size: 1.2rem;
}

.no-spinner ::-webkit-inner-spin-button,
.no-spinner ::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

.no-spinner {
  -moz-appearance: textfield;
}

.button-grid {
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
}

.button-row {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.btn {
  width: 70px;
  height: 70px;
  font-size: 1.5rem;
}

.control-btn {
  background: #ff9800;
  color: white;
  font-weight: bold;
  width: 100px;
}
</style>
