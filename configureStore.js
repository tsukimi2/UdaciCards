import { createStore, applyMiddleware } from 'redux'
import initSubscriber from 'redux-subscriber'
import getRootReducer  from './reducers'
import screenTracking from './middleware/screenTracking'
import * as Global from './utils/Global'

/*
const init_state = {
	ui: {
		showDeleteBtn: false,
		showEditBtn: false
	},
	page: {
		val: Global.PAGE.DEFAULT.val,
		title: Global.PAGE.DEFAULT.title,
		show_context_menu: false
	},
	signal_flags: {
		decks_delete_flag: false,
		deck_edit_flag: false
	},
	decks: [{
		id: 'abcde',
		name: 'Deck 1',
		cards: [{
			id: 'aaaaa',
			index: 1,
			question: 'Q1: question',
			ans: false
		}, {
			id: 'aaaab',
			index: 2,
			question: 'Q2: question',
			ans: false
		}, {
			id: 'aaaac',
			index: 3,
			question: 'Q3: question',
			ans: false
		}],
//		score: 0,
		is_selected: false,
//		num_cards_ans: 0
	}, {
		id: 'abcdd',
		name: 'Deck 2',
		cards: [],
//		score: 0,
		is_selected: false,
//		num_cards_ans: 0
	}]
}
*/


const init_state = {
	ui: {
		showDeleteBtn: false,
		showEditBtn: false
	},
	page: {
		val: Global.PAGE.DEFAULT.val,
		title: Global.PAGE.DEFAULT.title,
		show_context_menu: false
	},
	signal_flags: {
		decks_delete_flag: false,
		deck_edit_flag: false
	},
	decks: []
}


const configureStore = (navReducer) => {
	const store = createStore(getRootReducer(navReducer), init_state, applyMiddleware(screenTracking))
	const subscribe = initSubscriber(store)
	
	return store
}

export default configureStore