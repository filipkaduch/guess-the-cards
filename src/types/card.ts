export enum CardType {
  CLUBS = 'c',
  DIAMONDS = 'd',
  HEARTS = 'h',
  SPADES = 's',
}

export enum CardSymbol {
  ACE = 'A',
  TWO = '2',
  THREE = '3',
  FOUR = '4',
  FIVE = '5',
  SIX = '6',
  SEVEN = '7',
  EIGHT = '8',
  NINE = '9',
  TEN = 'T',
  JACK = 'J',
  QUEEN = 'Q',
  KING = 'K',
}

export interface Card {
  symbol: CardSymbol
  text: string
  type: CardType
}

export interface Solution {
  name: string
}
