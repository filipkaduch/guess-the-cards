<template>
  <div class="flex flex-col items-center">
    <div
      class="flex flex-col items-center justify-center gap-4 border-8 border-yellow-800 p-4 rounded bg-green-800 text-white h-[340px] w-[310px]"
    >
      <template v-if="activeComponent === GameComponents.CARDS_GAME">
        <CardsGame @evaluated="activeComponent = GameComponents.ROUND_RESULT" />
      </template>

      <template v-else-if="activeComponent === GameComponents.ROUND_RESULT">
        <RoundResult @continue="continueGame" />
      </template>

      <template v-else-if="activeComponent === GameComponents.LEADER_BOARD">
        <LeaderBoard @new-game="triggerGame" />
      </template>

      <template v-else>
        <h1 class="text-xl mb-8">Guess the cards</h1>

        <button
          type="button"
          class="inline-flex border-2 px-4 rounded font-semibold cursor-pointer mx-auto"
          @click="triggerGame"
        >
          Play
        </button>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useGameStore from '@/stores/GameStore'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'
import CardsGame from '@/components/game/CardsGame.vue'
import LeaderBoard from '@/components/leaderboard/LeaderBoard.vue'
import RoundResult from '@/components/game/RoundResult.vue'
import useLeaderBoardStore from '@/stores/LeaderBoardStore'
import { GameComponents } from '@/types/common'

const activeComponent = ref<string>('')

const { resumeTimer, startTimer } = useGameStore()

const { setResult } = useLeaderBoardStore()

const { time } = storeToRefs(useGameStore())

watch(
  () => time.value,
  (val) => {
    if (val === 0) {
      activeComponent.value = GameComponents.LEADER_BOARD
    }
  },
)

const triggerGame = () => {
  setResult()

  activeComponent.value = GameComponents.CARDS_GAME

  startTimer(100)
}

const continueGame = () => {
  activeComponent.value = GameComponents.CARDS_GAME

  resumeTimer()
}
</script>
