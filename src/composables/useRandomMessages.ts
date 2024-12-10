import { WordType } from '@/types/common'
import { WordType as WordTypeEnum } from '@/types/common'

const useRandomMessages = () => {
  const url = 'https://api.api-ninjas.com/v1/randomword'

  const sentenceTypes: WordType[] = [
    WordTypeEnum.ADJECTIVE,
    WordTypeEnum.NOUN,
    WordTypeEnum.VERB,
    WordTypeEnum.ADJECTIVE,
    WordTypeEnum.NOUN,
  ]

  const fetchRandomWord = async (type: WordType): Promise<string> => {
    const response = await fetch(`${url}?type=${type}`, {
      headers: {
        'X-Api-Key': import.meta.env.VITE_APP_API_NINJA_KEY,
      },
    })

    if (!response.ok) throw new Error('Failed to fetch random word')

    const data = await response.json()

    return data.word[0]
  }

  const capitalizeFirstChar = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  const createMessage = async (): Promise<string> => {
    const fetchPromises = sentenceTypes.map(async (type) => fetchRandomWord(type))

    try {
      const results = await Promise.all(fetchPromises)

      results[0] = capitalizeFirstChar(results[0])

      return `${results.join(' ')}.`
    } catch (err) {
      throw new Error(err as string)
    }
  }

  return {
    createMessage,
    fetchRandomWord,
  }
}

export default useRandomMessages
