<template>
  <span>{{ `Remaining time: ${time}s` }}</span>

  <div class="flex gap-5 py-5">
    <BaseCard v-for="(card, index) in randomCards" :key="`card-${index}`" :card="card" />
  </div>

  <div class="flex flex-col cursor-pointer items-center font-semibold w-full text-center">
    <button
      v-for="(solution, index) in gameSolutions"
      class="w-full hover:bg-green-900 hover:text-white transition-colors duration-300 py-2"
      :key="`solution-${index}`"
      @click="evaluteChoice(solution)"
    >
      {{ solution }}
    </button>
  </div>
</template>

<script setup lang="ts">
import useGame from '@/composables/useGame'
import { onMounted, ref } from 'vue'
import BaseCard from '@/components/game/card/BaseCard.vue'
import type { Card, Solution } from '@/types/card'
import { storeToRefs } from 'pinia'
import useGameStore from '@/stores/GameStore'
import { Hand } from 'pokersolver'
import useLeaderBoardStore from '@/stores/LeaderBoardStore'

const { generateRandomCards } = useGame()

const { correctAnswer, time } = storeToRefs(useGameStore())

const { modifyTime, pauseTimer } = useGameStore()

const { incrementResult } = useLeaderBoardStore()

const randomCards = ref<Card[]>([])

const correctSolution = ref<string>('')

const gameSolutions = ref<string[]>([])

const createRound = () => {
  randomCards.value = generateRandomCards(5)

  const tempCards = randomCards.value.slice()

  while (gameSolutions.value.length < 3) {
    const solutions = Hand.solve(tempCards.map((card) => card.text))

    if (!gameSolutions.value.length) {
      correctSolution.value = solutions.descr
    }

    gameSolutions.value.push(solutions.descr)

    const mostValues = solutions.values.reduce((longest: Solution[], currentArray: Solution[]) => {
      return currentArray.length > longest.length ? currentArray : longest
    }, [])

    const valueToRemove = mostValues[0].value

    const indexToRemove = tempCards.findIndex((card) => card.symbol === valueToRemove)
    
    if (indexToRemove !== -1) {
      tempCards.splice(indexToRemove, 1)
    }
  }

  gameSolutions.value = gameSolutions.value.sort(() => Math.random() - 0.5)
}

onMounted(() => {
  createRound()
})

const emit = defineEmits<{
  evaluated: [value: boolean]
}>()

const evaluteChoice = (solution: string) => {
  pauseTimer()

  const evaluation = solution === correctSolution.value

  if (evaluation) {
    incrementResult()

    modifyTime(5)
  }

  correctAnswer.value = evaluation

  emit('evaluated', evaluation)
}
</script>
