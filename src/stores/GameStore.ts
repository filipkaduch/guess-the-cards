import { defineStore } from 'pinia'
import { ref } from 'vue'

const useGameStore = defineStore('gameStore', () => {
  const time = ref<number>(0)

  const round = ref<number>(0)

  const isPaused = ref<boolean>(false)

  let intervalId: ReturnType<typeof setInterval> | null = null

  const correctAnswer = ref<boolean>(false)

  const modifyTime = (timeModification: number) => {
    time.value += timeModification
  }

  const stopTimer = () => {
    if (intervalId) {
      clearInterval(intervalId)
    }
  }

  const startTimer = (waitTime: number) => {
    stopTimer()

    time.value = waitTime

    intervalId = setInterval(() => {
      if (time.value > 0) {
        time.value -= 1
      } else if (intervalId !== null) {
        stopTimer()
      }
    }, 1000)
  }

  const pauseTimer = () => {
    if (intervalId) {
      clearInterval(intervalId)

      intervalId = null

      isPaused.value = true
    }
  }

  const resumeTimer = () => {
    if (!intervalId && isPaused.value && time.value > 0) {
      isPaused.value = false

      intervalId = setInterval(() => {
        if (time.value > 0) {
          time.value -= 1
        } else {
          stopTimer()
        }
      }, 1000)
    }
  }

  return {
    correctAnswer,
    modifyTime,
    pauseTimer,
    resumeTimer,
    round,
    startTimer,
    stopTimer,
    time,
  }
})

export default useGameStore
