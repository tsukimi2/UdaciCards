import { connect } from 'react-redux'
import { addCard } from '../actions/cards'
import MyEditCard from '../components/MyEditCard'

const mapStateToProps = (state, ownProps) => {
	const { navigation } = ownProps
	const { is_new, deck_id } = ownProps.navigation.state.params

	return {
		navigation,
		is_new,
		deck_id
	}
}

const mapDispatchToProps = dispatch => {
	return {
		addCard: (deck_id, card) => {
			dispatch(addCard(deck_id, card))
		}
	}
}

const MyCardContainer = connect(mapStateToProps, mapDispatchToProps)(MyEditCard)

export default MyCardContainer