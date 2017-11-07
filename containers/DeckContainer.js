import { connect } from 'react-redux'
import Deck from '../components/Deck'
import { setPage, addDeck, editDeck, deleteItems/* , updateDeckScore, incrDeckScore, decrDeckScore */ } from '../actions'

const mapStateToProps = (state, ownProps) => {
	const { navigation } = ownProps
	const { is_edit, id, name, num_cards/*, score */ } = ownProps.navigation.state.params	

	return {
		navigation,
		is_edit,
		id,
		name,
		num_cards,
//		score
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
		},
/*		
		updateDeckScore: (id, score, num_cards_ans) => {
			dispatch(updateDeckScore(id, score, num_cards_ans))
		},
		incrDeckScore: id => {
			dispatch(incrDeckScore(id))
		},
		decrDeckScore: id => {
			dispatch(decrDeckScore(id))
		}
*/		
	}
}

const DeckContainer = connect(mapStateToProps, mapDispatchToProps)(Deck)
export default DeckContainer