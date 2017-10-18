import { RECEIVE_DECKS, RECEIVE_DECK, ADD_DECK, ADD_CARD_TO_DECK  } from '../actions';

export default function entries(state={}, action) {
    switch(action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }

        case RECEIVE_DECK:
        case ADD_DECK:
            return {
                ...state,
                ...action.deck
            }

        case ADD_CARD_TO_DECK:
            return {
                ...state,
                [action.deckId]: {
                    ...state[action.deckId],
                    questions: [...state[action.deckId].questions, action.card]
                }
            }

        default:
            return state;
        
    }
}