export const RECEIVE_DECKS = 'RECEIVE_DECKS';
export const RECEIVE_DECK = 'RECEIVE_DECK';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD_TO_DECK = 'ADD_CARD_TO_DECK';

export function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks
    }
}

export function receiveDeck(deck) {
    return {
        type: RECEIVE_DECK,
        deck
    }
}
export function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck
    }
}

export function addCardToDeck(deckId, card) {
    return {
        type: ADD_CARD_TO_DECK,
        deckId,
        card
    }
}