import {
	UPDATE_CLEAR_DECKLIST_STATE_FLAG,
	UPDATE_ALL_DECKS_IS_SELECTED_FLAG,
	MARK_DECKS_DELETE_FLAG
} from '../actions/constants'

function signal_flags(state={}, action) {
	const { is_flag } = action

	switch(action.type) {
		case UPDATE_CLEAR_DECKLIST_STATE_FLAG:
			return {
				...state,
				update_clear_decklist_state_flag: is_flag
			}
		case UPDATE_ALL_DECKS_IS_SELECTED_FLAG:
			return {
				...state,
				update_all_decks_is_selected_flag: is_flag
			}
		case MARK_DECKS_DELETE_FLAG:
			return {
				...state,
				decks_delete_flag: is_flag
			}
		default:
			return state
	}
}

export default signal_flags