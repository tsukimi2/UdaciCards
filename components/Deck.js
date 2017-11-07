import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Container, Content, Card, CardItem, Button, Body, Text, Footer, Form, Input, Item, Left, View, Grid, Col } from 'native-base'
import { TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import * as Global from '../utils/Global'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import MyFabsBarContainer from '../containers/MyFabsBarContainer'

const ADD_DECK_TITLE = 'Add New Deck'

class Deck extends Component {
	constructor() {
		super()
		this.state = {
			id: '',
			name: '',
			is_edit: false
		}
	}

	componentWillMount() {
		const { id, name, is_edit, setPage } = this.props

		this.setState({
			id,
			name,
			is_edit
		})

		if(id !== Global.NEW) {
			setPage({ val: Global.PAGE.DECK.val, title: name })
		} else {
			setPage({ val: Global.PAGE.DECK.val, title: ADD_DECK_TITLE })
		}
	}


	handleNameChange(text) {	
		this.setState({ name: text })
	}

	startQuiz(id) {
		this.props.navigation.navigate("MyDeckSwiper", {
			id			
		})
	}

	saveDeck() {
		// save deck
		const { id, name } = this.state

		if(id === Global.NEW) {
			this.props.addDeck({
				id,
				name
			})
		} else {
			this.props.editDeck({
				id,
				name
			})
		}

		// if successful, go back to decklist.
		// ToDo: If not, notify user of error
		this.props.navigation.navigate("DeckList")	
	}

	gotoAddDeckForm() {
	    this.props.navigation.navigate("Deck", {
	      is_edit: true,
	      id: Global.NEW,
	      name: '',
	      num_cards: 0,
	      score: 0
	    })
	}

	gotoEditDeckForm() {
		this.setState({ is_edit: true })
	}

	gotoAddCardForm() {
		this.props.navigation.navigate("EditCard", {
			is_new: true
		})
	}

	deleteDeck() {
		const { navigation } = this.props

		const curr_route_name = Global.getCurrentRouteName(navigation.state)
		this.props.deleteDeck(curr_route_name, this.state.id)

		// if successful, go back to decklist.
		// ToDo: If not, notify user of error
		this.props.navigation.navigate("DeckList")
	}

	render() {
		const { id, name, num_cards, score, navigation } = this.props
		const { is_edit } = this.state
		const card_key = 'card_key_' + id
		const card_item_key = 'carditem_key_' + id

		return(
			<Container>
				<Content padder>
					<Card key={card_key}>
						<Form>
							<CardItem key={card_item_key} style={styles.card_header}>
								<Left>
								<FAIcon name="circle" style={styles.select_icon} size={40} />
								{
									!is_edit ? (
										<Body>
											<Text>{name}</Text>
											<Text note>{num_cards} cards</Text>
										</Body>
									) : (
										<Body>
											<Item regular>
												<Input name="name" placeholder="Deck name" value={this.state.name} onChangeText={this.handleNameChange.bind(this)} />
											</Item>
											<Text note>{num_cards} cards</Text>
										</Body>
									)
								}
								</Left>
							</CardItem>
							<CardItem style={styles.card_body}>
							{
								!is_edit ? (
									<View>								
										{
											num_cards > 0 ? (
												<Button onPress={this.startQuiz.bind(this, id)} style={styles.card_button}>
													<Text>Start Quiz</Text>
												</Button>
											) : (
												<Button disabled style={styles.card_button}>
													<Text>Start Quiz</Text>
												</Button>
											)
										}
										<Button style={styles.card_button} onPress={this.gotoAddCardForm.bind(this)}>
											<Text>Add Card</Text>
										</Button>									
									</View>
								) : (
									<View>
										<Button block onPress={this.saveDeck.bind(this)} style={styles.card_button}>
											<Text>Save</Text>
										</Button>
									</View>
								)
							}
							</CardItem>
						</Form>
					</Card>
				</Content>
				{
					is_edit === false ? (
						<View>
					        <MyFabsBarContainer
					          onAdd={this.gotoAddDeckForm.bind(this)}
					          onEdit={this.gotoEditDeckForm.bind(this)}
					          onDelete={this.deleteDeck.bind(this)}
					          navigation={navigation}
					    	/>
					    </View>
					) : (
						<View></View>
					)
				}
			</Container>	
		)	
	}
}

const styles = StyleSheet.create({
	card_body: {
		flex: 3,
		flexDirection: 'row',	
		alignItems: 'stretch',
		justifyContent: 'center',
		minHeight: 200
	},
	card_header: {
		flex: 1,
		alignItems: 'flex-start'
	},
	card_footer: {
		flex: 1
	},
	card_button: {
		marginTop: 5,
		marginBottom: 5,
		width: 200
	},
	select_icon: {
		width: 60,
		color: "#1E90FF"
	}
})

Deck.propTypes = {	
	is_edit: PropTypes.bool.isRequired,
	navigation: PropTypes.object,
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	num_cards: PropTypes.number.isRequired,
//	score: PropTypes.number.isRequired,
	setPage: PropTypes.func.isRequired,
//	updateDeckScore: PropTypes.func.isRequired,
//	incrDeckScore: PropTypes.func.isRequired,
//	decrDeckScore: PropTypes.func.isRequired
}

export default Deck