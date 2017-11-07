import { setHeaderBtnVisibility } from './ui'
import { setPage, showContextMenu, hideContextMenu } from './page'
import { updateClearDecklistStateFlag, markDecksDeleteFlag, updateAllDecksIsSelectedFlag } from './signal_flags'
import { updateAllDecksIsSelected, updateDeckIsSelected, addDeck, editDeck/*, updateDeckScore, incrDeckScore, decrDeckScore*/ } from './decks'
import { DELETE_DECKITEMS, DELETE_DECK, MARK_DECKS_DELETE_FLAG } from './constants'
import * as Global from '../utils/Global'

export function deleteItems(curr_route_name, arg2) {
	if(curr_route_name === Global.PAGE.DEFAULT.val) {
		return {
			type: DELETE_DECKITEMS
		}
	} else if(curr_route_name === Global.PAGE.DECK.val) {		
		return {
			type: DELETE_DECK,
			deck_id: arg2
		}
	}
}

export { setHeaderBtnVisibility }

export { setPage }
export { showContextMenu }
export { hideContextMenu }

export { updateClearDecklistStateFlag }
export { updateAllDecksIsSelectedFlag }
export { markDecksDeleteFlag }

export { updateAllDecksIsSelected }
export { updateDeckIsSelected }

export { addDeck }
export { editDeck }
//export { updateDeckScore }
//export { incrDeckScore }
//export { decrDeckScore }