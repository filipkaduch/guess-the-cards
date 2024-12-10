import type { Card } from '@/types/card'
import { CardSymbol, CardType } from '@/types/card'

const useGame = () => {
  const createDeck = (): Card[] => {
    const symbols = Object.values(CardSymbol)

    const types = Object.values(CardType)

    const deck: Card[] = []

    for (const symbol of symbols) {
      for (const type of types) {
        deck.push({
          symbol,
          text: `${symbol}${type}`,
          type,
        })
      }
    }

    return deck
  }

  const generateRandomCards = (numberOfCards: number): Card[] => {
    if (numberOfCards > 52) {
      throw new Error('Cannot generate more than 52 unique cards from a standard deck.')
    }

    const deck: Card[] = createDeck()

    for (let i = deck.length - 1; i > 0; i -= 1) {
      const randomIndex = Math.floor(Math.random() * (i + 1))

      ;[deck[i], deck[randomIndex]] = [deck[randomIndex], deck[i]]
    }

    return deck.slice(0, numberOfCards)
  }

  return {
    createDeck,
    generateRandomCards,
  }
}

export default useGame
