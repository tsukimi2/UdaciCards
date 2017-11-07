import { UPDATE_ALL_DECKS_IS_SELECTED, UPDATE_DECK_IS_SELECTED, ADD_DECK, EDIT_DECK/*, UPDATE_DECK_SCORE, INCR_DECK_SCORE, DECR_DECK_SCORE */ } from './constants'

export function updateAllDecksIsSelected(is_selected) {
	return {
		type: UPDATE_ALL_DECKS_IS_SELECTED,
		is_selected: is_selected
	}
}

export function updateDeckIsSelected(deck_id, is_selected) {
	return {
		type: UPDATE_DECK_IS_SELECTED,
		id: deck_id,
		is_selected: is_selected
	}
}

export function addDeck(deck) {
	return {
		type: ADD_DECK,
		deck
	}
}

export function editDeck(deck) {
	return {
		type: EDIT_DECK,
		deck
	}
}

/*
export function updateDeckScore(id, score, num_cards_ans) {
	return {
		type: UPDATE_DECK_SCORE,
		id,
		score,
		num_cards_ans
	}
}

export function incrDeckScore(id) {
	return {
		type: INCR_DECK_SCORE,
		id
	}
}

export function decrDeckScore(id) {
	return {
		type: DECR_DECK_SCORE,
		id
	}
}
*/