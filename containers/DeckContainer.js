import { connect } from 'react-redux'
import Deck from '../components/Deck'
import { setPage, addDeck, editDeck, deleteItems/* , updateDeckScore, incrDeckScore, decrDeckScore */ } from '../actions'
import * as Global from '../utils/Global'

const mapStateToProps = (state, ownProps) => {
	const { navigation } = ownProps
	const { is_edit, id, name, num_cards } = ownProps.navigation.state.params
	let deck = null

	if(id !== Global.NEW) {
		deck = state.decks.find(curr_deck => curr_deck.id === id)
	}

	return {
		navigation,
		is_edit,
		id,
		name: typeof name !== 'undefined' ? name : deck.name,
		num_cards: typeof num_cards !== 'undefined' ? num_cards : deck.cards.length
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setPage: page => {
			dispatch(setPage(page))
		},
		addDeck: deck => {
			dispatch(addDeck(deck))
		},
		editDeck: deck => {
			dispatch(editDeck(deck))
		},
		deleteDeck: (curr_route_name, id) => {
			dispatch(deleteItems(curr_route_name, id))
		}		
	}
}

const DeckContainer = connect(mapStateToProps, mapDispatchToProps)(Deck)
export default DeckContainer