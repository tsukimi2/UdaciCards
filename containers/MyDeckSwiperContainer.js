import { connect } from 'react-redux'
import { setPage/*, updateDeckScore */ } from '../actions'
import MyDeckSwiper from '../components/MyDeckSwiper'

const mapStateToProps = (state, ownProps) => {
	const { id, callbacks } = ownProps.navigation.state.params	
	const selected_deck = state.decks.filter(deck => id === deck.id)
	
	return {
		id,
		navigation: ownProps.navigation,
		cards: selected_deck.length === 0 ? [] : selected_deck[0].cards.map(card => ({
			id: card.id,
			index: card.index,
			question: card.question,
			ans: card.ans,
			is_correct: typeof card.is_correct !== 'undefined' ? card.is_correct : null
		})),
		deck_name: selected_deck.length === 0 ? '' : selected_deck[0].name,
//		score: selected_deck.length === 0 ? 0 : selected_deck[0].score,
//		num_cards_ans: selected_deck.length === 0 ? 0 : selected_deck[0].num_cards_ans,
//		callbacks: callbacks
	}
}

const mapDispatchToProps = dispatch => {
	return {		
		setPage: page => {
			dispatch(setPage(page))
		}
	}
}

const MyDeckSwiperContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MyDeckSwiper)

export default MyDeckSwiperContainer

