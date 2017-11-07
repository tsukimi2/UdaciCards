import {
	UPDATE_CLEAR_DECKLIST_STATE_FLAG,
	UPDATE_ALL_DECKS_IS_SELECTED_FLAG,
	MARK_DECKS_DELETE_FLAG
} from './constants'

export function updateClearDecklistStateFlag(is_flag) {
	return {
		type: UPDATE_CLEAR_DECKLIST_STATE_FLAG,
		is_flag
	}
}

export function updateAllDecksIsSelectedFlag(is_flag) {
	return {
		type: UPDATE_ALL_DECKS_IS_SELECTED_FLAG,
		is_flag
	}
}

export function markDecksDeleteFlag(is_flag) {
	return {
		type: MARK_DECKS_DELETE_FLAG,
		is_flag
	}
}