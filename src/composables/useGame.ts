import type { Card } from '@/types/card'
import { CardSymbol, CardType } from '@/types/card'

const useGame = () => {
  const getRandomSolutions = (solutions: string[], numberOfsolutions: number) => {
    if (solutions.length < numberOfsolutions) {
      throw new Error('Less possible solutions than desired number')
    }

    const shuffled = [...solutions]

    for (let i = shuffled.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1))

      ;[shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]]
    }

    return shuffled.slice(0, numberOfsolutions)
  }

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
    getRandomSolutions,
  }
}

export default useGame
