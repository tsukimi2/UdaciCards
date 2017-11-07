import { connect } from 'react-redux'
import {
	setPage,
	showContextMenu,
	hideContextMenu,
	updateAllDecksIsSelected,
	updateDeckIsSelected,
	setHeaderBtnVisibility,
	updateClearDecklistStateFlag,
	updateAllDecksIsSelectedFlag,
	markDecksDeleteFlag
} from '../actions'
import DeckList from '../components/DeckList'

const mapStateToProps = state => {
	return {		
		decks: state.decks.map(deck => ({
			id: deck.id,
			name: deck.name,
			num_cards: deck.cards.length,
			score: deck.score,
			is_selected: deck.is_selected
		}))
	}
}

const mapDispatchToProps = dispatch => {
	return {
		setPage: page => {
			dispatch(setPage(page))
		},
		showContextMenu: () => {
			dispatch(showContextMenu())
		},
		hideContextMenu: () => {
			dispatch(hideContextMenu())
		},
		updateClearDecklistStateFlag: (is_flag) => {
			dispatch(updateClearDecklistStateFlag(is_flag))
		},
		updateAllDecksIsSelected: (is_selected) => {
			dispatch(updateAllDecksIsSelected(is_selected))
		},
		updateDeckIsSelected: (id, is_selected) => {
			dispatch(updateDeckIsSelected(id, is_selected))
		},
		setHeaderBtnVisibility: (visibility) => {
			dispatch(setHeaderBtnVisibility(visibility))
		},
		updateAllDecksIsSelectedFlag: (is_flag) => {
			dispatch(updateAllDecksIsSelectedFlag(is_flag))
		},
		setDecksDeleteFlag: (is_flag) => {
			dispatch(markDecksDeleteFlag(is_flag))
		}
	}
}

const DeckListContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(DeckList)

export default DeckListContainer