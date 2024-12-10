<template>
  <h1 class="font-bold">Leaderboard</h1>

  <div class="overflow-y-auto flex flex-col gap-2 w-full text-center">
    <div v-for="(result, index) in results" :key="`result-${index}`">
      {{ `Attempt: ${result.attempt} / Answers: ${result.answers}` }}
    </div>
  </div>

  <button
    type="button"
    class="inline-flex border-2 px-4 rounded font-semibold cursor-pointer"
    @click="$emit('new-game')"
  >
    Play again
  </button>
</template>

<script lang="ts" setup>
import useLeaderBoardStore from '@/stores/LeaderBoardStore'
import { storeToRefs } from 'pinia'

const { results } = storeToRefs(useLeaderBoardStore())
</script>
