import { ADD_CARD, EDIT_CARD, DELETE_CARD } from './constants'

export function addCard({deck_id, card_id, question, ans}) {	
	return {
		type: ADD_CARD,
		deck_id,
		card: {
			id: card_id,
			question,
			ans: ans
		}
	}
}

export function deleteCard(deck_id) {
	return {
		type: DELETE_CARD,
		deck_id
	}
}