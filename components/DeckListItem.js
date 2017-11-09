import React, {Component} from 'react'
import { TouchableOpacity, StyleSheet } from 'react-native'
import { Card, CardItem, Body, Text, Left, View } from 'native-base'
import PropTypes from 'prop-types'
import * as Global from '../utils/Global'
import FAIcon from 'react-native-vector-icons/FontAwesome'


class DeckListItem extends Component {
	constructor() {
		super()
		this.state = {
			opacity: Global.UNPRESSED_TOUCHABLE_OPACITY
		}
	}

	handleItemSelectionToggle(id) {
// change opacity
// https://stackoverflow.com/questions/39252939/want-to-change-opacity-with-react-native-refs-on-click
		const { is_selected } = this.props
		
		if(!is_selected) {		
			this.setState({ opacity: Global.PRESSED_TOUCHABLE_OPACITY })		
			this.props.onItemSelected(id)
		} else {		
			this.setState({ opacity: Global.UNPRESSED_TOUCHABLE_OPACITY })
			this.props.onItemDeselected(id)			
		}		
	}

	handlePress(id, name, num_cards/*, score */) {	
		const { num_items_selected, setPage } = this.props

		if(num_items_selected === 0) {
			this.props.navigation.navigate("Deck", {
				is_edit: false,
				id,
				name,
				num_cards
			})
		} else {
			this.handleItemSelectionToggle(id)
		}
	}

	handleLongPress(id) {		
		this.handleItemSelectionToggle(id)
	}

	render() {	
		const { id, name, num_cards/*, score*/, is_selected } = this.props
		const { opacity } = this.state
	    const card_key = 'card_key_' + id
	    const card_item_key = 'card_item_' + id

// <TouchableOpacity style={{ opacity: Global.UNPRESSED_TOUCHABLE_OPACITY }} 
		if(!is_selected) {
			return (
				<TouchableOpacity onPress={this.handlePress.bind(this, id, name, num_cards/*, score*/)} onLongPress={this.handleLongPress.bind(this, id)}>
					<Card key={card_key} >
						<CardItem key={card_item_key} >
							<FAIcon name="circle" style={styles.select_icon} size={40} />
							<Body>
								<Text>{name}</Text>
								<Text note>{num_cards} cards</Text>
							</Body>
						</CardItem>
					</Card>
				</TouchableOpacity>
			)
		} else {
			return (
				<TouchableOpacity onPress={this.handlePress.bind(this, id, name, num_cards/*, score*/)} onLongPress={this.handleLongPress.bind(this, id)}>
					<Card key={card_key} >
						<CardItem key={card_item_key} >
							<FAIcon name="check-circle" style={styles.select_icon} size={40} />
							<Body>
								<Text>{name}</Text>
								<Text note>{num_cards} cards</Text>
							</Body>
						</CardItem>
					</Card>
				</TouchableOpacity>
			)			
		}
	}
}

const styles = StyleSheet.create({
	select_icon: {
		width: 60,
		color: "#1E90FF"
	}
})

DeckListItem.propTypes = {
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	num_cards: PropTypes.number.isRequired,
//	score: PropTypes.number.isRequired,
	is_selected: PropTypes.bool.isRequired,
	num_items_selected: PropTypes.number.isRequired,	
	setPage: PropTypes.func.isRequired,
	showContextMenu: PropTypes.func.isRequired,
	onItemSelected: PropTypes.func.isRequired,
	onItemDeselected: PropTypes.func.isRequired
}

export default DeckListItem