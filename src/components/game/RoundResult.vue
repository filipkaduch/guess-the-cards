<template>
  <template v-if="isLoading">
    <RoundLoader />
  </template>
  <template v-else>
    <div class="font-bold">
      {{ correctAnswer ? 'Correct!' : 'Wrong!' }}
    </div>

    <div>
      {{ correctAnswer ? 'You gain 5 seconds' : '' }}
    </div>

    <div class="text-center w-full font-semibold">{{ message }}</div>

    <button
      type="button"
      class="inline-flex border-2 px-4 rounded font-semibold cursor-pointer"
      @click="$emit('continue')"
    >
      Continue
    </button>
  </template>
</template>

<script lang="ts" setup>
import useRandomMessages from '@/composables/useRandomMessages'
import useGameStore from '@/stores/GameStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import RoundLoader from '@/components/game/RoundLoader.vue'

const { correctAnswer } = storeToRefs(useGameStore())

const { createMessage } = useRandomMessages()

const message = ref<string>('')

const isLoading = ref<boolean>(true)

onMounted(async () => {
  try {
    message.value = await createMessage()
  } catch (err) {
    console.error(err)
  } finally {
    isLoading.value = false
  }
})
</script>
