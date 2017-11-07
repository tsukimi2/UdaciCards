import {
	UPDATE_ALL_DECKS_IS_SELECTED,
	UPDATE_DECK_IS_SELECTED,
	DELETE_DECKITEMS,
	DELETE_DECKS,
	ADD_DECK,
	EDIT_DECK,
	DELETE_DECK,
//	UPDATE_DECK_SCORE,
//	INCR_DECK_SCORE,
//	DECR_DECK_SCORE
} from '../actions/constants'
import update from 'immutability-helper'
var uuid = require('uuid-v4')
import * as Global from '../utils/Global'

function decks(state=[], action) {
//console.log('state')
//console.log(state)
//console.log('action')
//console.log(action)	
	switch(action.type) {
		case UPDATE_ALL_DECKS_IS_SELECTED:
		{
			const new_state = state.map(deck => ({
				...deck,
				is_selected: action.is_selected
			}))

			return new_state
		}
		case UPDATE_DECK_IS_SELECTED:
		{
			const { id, is_selected } = action
			const index = state.findIndex(deck => deck.id === id)

			const new_state = update(state, {
				[index]: {
					is_selected: { $set: is_selected }
				}
			})

			return new_state
		}
		case DELETE_DECKITEMS:
		{
			// put index of decks to be deleted into an array	
			let arr_selected_index = []
			for(let i = 0; i < state.length; i++) {
				if(state[i].is_selected === true) {
					arr_selected_index.push(i)
				}
			}

			// remove selected decks from decklist
			const new_state = state.slice()
			for(let i = arr_selected_index.length - 1; i >= 0; i--) {				
				new_state.splice(i, 1)					
			}
			
			// recalculate index for each deck in decklist
			for(let i = 0; i < new_state.length; i++) {
				new_state[i].index = i + 1
			}

			return new_state
		}
		case DELETE_DECK:

			const { deck_id } = action

			const index = state.findIndex(deck => deck.id === deck_id)

			if(index !== -1) {
				const new_state = update(state, {
					$splice: [[ index, 1 ]]
				})
				return new_state
			}

			// ToDo: return error
			return state
		case ADD_DECK:
		{
			const { name } = action.deck
			const id = uuid()

			const new_deck = {
				id,
				index: state.index,
				name,
				cards: [],
				score: Global.DEFAULT_SCORE,
				is_selected: false,
				num_cards_ans: 0
			}
		
			const new_state = update(state, {
				$push: [ new_deck ]
			})

			return new_state
		}
		case EDIT_DECK:
		{
			const { id, name } = action.deck
			const index = state.findIndex(deck => deck.id === id)

			if(index !== -1) {
				const new_state = update(state, {
					[index]: {
						name: { $set: name }
					}
				})

				return new_state
			}

			// ToDo: return error
			return state
		}
/*		
		case UPDATE_DECK_SCORE:
		{
			const { id, score, num_cards_ans } = action
			const index = state.findIndex(deck => deck.id === id)

			if(index !== -1) {
				const new_state = update(state, {
					[index]: {
						score: { $set: score },
						num_cards_ans: { $set: num_cards_ans }
					}
				})

				return new_state
			}

			// ToDo: return error
			return state
		}		
		case INCR_DECK_SCORE:
		{		
			const { id } = action

			const index = state.findIndex(deck => deck.id === id)		
			if(index !== 1) {
				const new_state = update(state, {
					[index]: {
						score: { $apply: x => x + 1 },
						num_cards_ans: { $apply: x => x + 1 }
					}
				})

				return new_state
			}

			return state
		}
		case DECR_DECK_SCORE:
		{		
			const { id } = action

			const index = state.findIndex(deck => deck.id === id)
			if(index !== 1) {
				const new_state = update(state, {
					[index]: {
						score: { $apply: x => {
							const z = x - 1
							return z > 0 ? z : 0
						} },
						num_cards_ans: { $apply: x => x + 1 }
					}
				})

				return new_state
			}

			return state			
		}
*/
		case DELETE_DECKS:
			return state
		default:
			return state
	}
}

export default decks