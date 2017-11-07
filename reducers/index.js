import {combineReducers} from 'redux'
import ui from './ui'
import page from './page'
import signal_flags from './signal_flags'
import decks from './decks'

export default function getRootReducer(navReducer) {
	return combineReducers({
		nav: navReducer,
		ui,
		page,
		signal_flags,
		decks
	})
}