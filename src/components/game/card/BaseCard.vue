<template>
  <div :class="cardClasses">
    <p class="font-semibold text-black">{{ card.symbol }}</p>
    <component :is="cardIcon" class="h-4 w-4" :class="`fill-${getCardColor}-800`" />
  </div>
</template>

<script lang="ts" setup>
import type { Card } from '@/types/card'
import { CardType } from '@/types/card'
import type { Component, PropType } from 'vue'
import { computed } from 'vue'
import IconDiamonds from '@/components/game/card/icons/IconDiamonds.vue'
import IconClubs from '@/components/game/card/icons/IconClubs.vue'
import IconHearts from '@/components/game/card/icons/IconHearts.vue'
import IconSpades from '@/components/game/card/icons/IconSpades.vue'

const props = defineProps({
  card: {
    type: Object as PropType<Card>,
    required: true,
  },
})

const cardIcon = computed<Component>(() => {
  switch (props.card.type) {
    case CardType.CLUBS:
      return IconClubs
    case CardType.DIAMONDS:
      return IconDiamonds
    case CardType.HEARTS:
      return IconHearts
    case CardType.SPADES:
      return IconSpades
    default:
      return {}
  }
})

const getCardColor = computed<string>(() => {
  switch (props.card.type) {
    case CardType.CLUBS:
      return 'green'
    case CardType.DIAMONDS:
      return 'blue'
    case CardType.HEARTS:
      return 'red'
    case CardType.SPADES:
      return 'white'
    default:
      return 'black'
  }
})

const cardClasses = computed<string>(() => {
  let classes = `border border-2 border-black rounded min-w-7 items-center flex flex-col p-2 `

  if (getCardColor.value !== 'white') {
    classes += `bg-${getCardColor.value}-300`
  } else {
    classes += `bg-${getCardColor.value}`
  }

  return classes
})
</script>
