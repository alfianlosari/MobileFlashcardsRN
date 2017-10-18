import { AsyncStorage } from 'react-native'; 

export const DECK_STORAGE_KEY = 'MobileFlashCards::Decks'

export function getDecks() {
    return AsyncStorage.getItem(DECK_STORAGE_KEY)
        .then((decks) => (JSON.parse(decks)));
}

export function getDeck(id) {
    return getDecks()
        .then((decks) => {
            if (decks === null) return null;
            return decks[id]
        });
}

export function saveDeckTitle(id, title) {
    return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
       [id]: {
           id,
           title,
           questions: []
       } 
    }))
}

export function saveCardToDeck(id, card) {
    return getDeck(id)
        .then((deck) => {
            if (deck === null) return null;
            return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
                [id]: {
                    ...deck,
                    questions: [...deck.questions, card]
                }
            }))
        })
        .then(() => card)
}
