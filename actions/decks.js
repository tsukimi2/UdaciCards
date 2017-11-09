import { SET_DECKS, UPDATE_ALL_DECKS_IS_SELECTED, UPDATE_DECK_IS_SELECTED, ADD_DECK, EDIT_DECK } from './constants'

export function setDecks(decks) {
	return {
		type: SET_DECKS,
		decks
	}
}

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