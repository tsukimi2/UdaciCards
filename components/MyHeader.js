import React from 'react'
import PropTypes from 'prop-types'
import { Header, Left, Body, Right, Icon, Title, Button } from 'native-base'
import { Text, StyleSheet } from 'react-native'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import * as Global from '../utils/Global'
import * as Api from '../utils/api'

function goBack(navigation) {
	navigation.goBack()
}

function handleEditClick(state, curr_route_name, navigation, setHeaderBtnVisibility, setPage) {
	setHeaderBtnVisibility({ showDeleteBtn: false, showEditBtn: false })

	if(curr_route_name === Global.PAGE.DEFAULT.val) {
		const edit_index = state.decks.findIndex(deck => deck.is_selected === true)
		if(edit_index !== -1) {
			const { id, name, score } = state.decks[edit_index]
			
			navigation.navigate("Deck", {
				is_edit: true,
				id,
				name,
				num_cards: state.decks[edit_index].cards.length,
				score,
				setPage
			})			
		}
	} else if(curr_route_name === Global.PAGE.DECK.val) {

	}
}

function handleDeleteClick(onDeleteClick, state, curr_route_name) {
console.log('handleDeleteClick')	
	if(curr_route_name === Global.PAGE.DEFAULT.val) {
		const delete_index = state.decks.findIndex(deck => deck.is_selected === true)
		if(delete_index !== -1) {
			const { id } = state.decks[delete_index]

			onDeleteClick(curr_route_name)

			Api.deleteDeck(id, err => {
console.log('err')
console.log(err)				
				if(err) {
					// ToDo: revert redux store and notify user
				}
			})
		}
	}
}

const MyHeader = ({
	state,
	title,
	showVerticalDots,
	showBackBtn,
	showDeleteBtn,
	showEditBtn,
	onBackBtnClick,
	onDeleteClick,
	navigation,
	setHeaderBtnVisibility,
	setPage }) => {

	const right_side_content = () => {	
		if(showDeleteBtn === true && showEditBtn === true) {			
			const curr_route_name = Global.getCurrentRouteName(navigation.state)

			return (
				<Right>
					<FAIcon name="trash" size={25} onPress={handleDeleteClick.bind(this, onDeleteClick, state, curr_route_name)} />
					<Text> </Text>
					<FAIcon
						name="edit"
						size={25}
						onPress={handleEditClick.bind(this, state, curr_route_name, navigation, setHeaderBtnVisibility, setPage)} />
					<Text> </Text>
					<EntypoIcon name="dots-three-vertical" size={25} />
				</Right>
			)
		} else {
			return(
				<Right>
					<EntypoIcon name="dots-three-vertical" size={25} />
				</Right>
			)
		}
	}

	return(
		<Header>
			<Left>
				{ showBackBtn === true && (
					<Button transparent onPress={goBack.bind(this, navigation)}>
						<Icon name='arrow-back' />
					</Button>
				)}
			</Left>
			<Body>
				<Title>{title}</Title>
			</Body>
			{ right_side_content() }
		</Header>
	)
}

const styles = StyleSheet.create({
	header_row_container: {
		flexDirection: 'row'
	},
	title: {
		paddingLeft: 10,
		paddingTop: 5
	}
})

MyHeader.propTypes = {
	title: PropTypes.string.isRequired,
	showBackBtn: PropTypes.bool.isRequired,
	showDeleteBtn: PropTypes.bool.isRequired,
	showEditBtn: PropTypes.bool.isRequired,
	onBackBtnClick: PropTypes.func,
	onDeleteClick: PropTypes.func.isRequired
}

export default MyHeader