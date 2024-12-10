import type { GameResult } from '@/types/result'
import { defineStore } from 'pinia'
import { ref } from 'vue'

const useLeaderBoardStore = defineStore('leaderBoardStore', () => {
  const results = ref<GameResult[]>([])

  const activeAttemptIndex = ref<number>(0)

  const setResult = () => {
    results.value.push({ attempt: results.value.length + 1, answers: 0 })

    activeAttemptIndex.value = results.value.length - 1
  }

  const incrementResult = () => {
    results.value[activeAttemptIndex.value].answers += 1
  }

  return {
    incrementResult,
    results,
    setResult,
  }
})

export default useLeaderBoardStore
