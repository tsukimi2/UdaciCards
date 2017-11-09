import { connect } from 'react-redux'
import { setPage, deleteCard } from '../actions'
import MyDeckSwiper from '../components/MyDeckSwiper'

const mapStateToProps = (state, ownProps) => {
	const { id, callbacks } = ownProps.navigation.state.params	
	const selected_deck = state.decks.filter(deck => id === deck.id)
console.log('selected_deck')
console.log(selected_deck)	
	return {
		id,
		navigation: ownProps.navigation,
		cards: selected_deck.length === 0 ? [] : selected_deck[0].cards.map(card => ({
			id: card.id,
			index: card.index,
			question: card.question,
			ans: card.ans,
//			is_correct: typeof card.is_correct !== 'undefined' ? card.is_correct : null
		})),
		deck_name: selected_deck.length === 0 ? '' : selected_deck[0].name
	}
}

const mapDispatchToProps = dispatch => {
	return {		
		setPage: page => {
			dispatch(setPage(page))
		},
		deleteCard: (deck_id) => {
			dispatch(deleteCard(deck_id))
		}
	}
}

const MyDeckSwiperContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MyDeckSwiper)

export default MyDeckSwiperContainer

