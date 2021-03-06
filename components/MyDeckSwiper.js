import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Header, Content, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon, Button } from 'native-base'
import MyFabsBarContainer from '../containers/MyFabsBarContainer'
import MyCard from './MyCard'
import * as Global from '../utils/Global'

class MyDeckSwiper extends Component {
	constructor() {
		super()
		this.state = {
			score: 0,
			num_cards_ans: 0
		}		
	}

	componentWillMount() {
		const { deck_name } = this.props
		this.props.setPage({ val: Global.PAGE.DECK_SWIPER.val, title: deck_name })
	}		

	handleIncrDeckScore() {
		const num_cards = this.props.cards.length
		const  { score, num_cards_ans } = this.state

		this.setState({
			score: score + 1,
			num_cards_ans: num_cards_ans !== num_cards ? num_cards_ans + 1 : num_cards
		})
	}

	handleDecrDeckScore() {
		const num_cards = this.props.cards.length
		const  { score, num_cards_ans } = this.state

		this.setState({
			score: score !== 0 ? score - 1 : 0,
			num_cards_ans: num_cards_ans !== num_cards ? num_cards_ans + 1 : num_cards
		})
	}	

	updateStateUponAns() {

	}

	gotoAddCardForm() {
console.log('add card')
	}

	gotoEditCardForm() {
console.log('edit card')
	}

	deleteCard() {
console.log('delete card')
//		this.props.deleteCard()
	}

	restartQuiz() {
		const { id } = this.props
		this.props.navigation.navigate("MyDeckSwiper", {
			id	
		})
	}

	handleSwipeRight() {

	}

	render() {
		const { navigation, cards, deck_name, incrDeckScore, decrDeckScore } = this.props
		const { score, num_cards_ans } = this.state

		return(
			<Container>
				<Content padder>
					<DeckSwiper
						ref={(c) => this._deckSwiper = c }
						dataSource={cards}
						looping={false}
						renderEmpty={() => {
							if(cards.length !== 0) {
								return(
									<View style={styles.empty_container}>
										<Text>Quiz completed!</Text>
										<Text>Your score is {score} / {cards.length}</Text>
										<Button onPress={this.restartQuiz.bind(this)}>
											<Text>Restart Quiz</Text>
										</Button>
									</View>
								)
							} else {
								return(
									<View style={styles.empty_container}>
										<Text>The quiz does not contain any card.</Text>
										<Text>Please click the Plus icon to add a new card.</Text>
									</View>
								)
							}
						}}
						renderItem={card => {						
							const { id, index, question, ans, is_correct } = card

							return(
								<MyCard
									card_num={card.index}
									score={score}
									num_cards={cards.length}
									num_cards_ans={num_cards_ans}
									callbacks={{
										incrDeckScore: this.handleIncrDeckScore.bind(this),
										decrDeckScore: this.handleDecrDeckScore.bind(this)
									}}
									updateStateUponAns={this.updateStateUponAns.bind(this)}
									{...card}
								/>
							)
						}}
						onSwipeRight={this.handleSwipeRight.bind(this)}
					/>
				</Content>			
		        <MyFabsBarContainer
		          onAdd={this.gotoAddCardForm.bind(this)}
		          onEdit={this.gotoEditCardForm.bind(this)}
		          onDelete={this.deleteCard.bind(this)}
		          navigation={navigation}
		    	/>
		    	{
		    		(
						<View style={styles.footer}>
							<Button iconLeft onPress={() => {
								this._deckSwiper._root.swipeLeft()
							}}>
								<Icon name="arrow-back" />
								<Text>Prev</Text>
							</Button>
							<Button iconRight onPress={() => {
								this._deckSwiper._root.swipeRight()							
							}}>
								<Text>Next</Text>
								<Icon name="arrow-forward" />
							</Button>					
						</View>
		    		)
		    	}
			</Container>
		)
	}
}

const styles = {
	empty_container: {
		alignSelf: "center"
	},
	footer: {
		flexDirection: "row",
		flex: 1,
		position: "absolute",
		bottom: 50,
		left: 0,
		right: 0,
		justifyContent: 'space-between',
		padding: 15
	}
}

MyDeckSwiper.propTypes = {
	id: PropTypes.string.isRequired,
	deck_name: PropTypes.string.isRequired,
	navigation: PropTypes.object.isRequired,
	cards: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			index: PropTypes.number.isRequired,
			question: PropTypes.string.isRequired,
			ans: PropTypes.bool.isRequired
		})
	),
	setPage: PropTypes.func.isRequired,
	callbacks: PropTypes.shape({
		incrDeckScore: PropTypes.func.isRequired,
		decrDeckScore: PropTypes.func.isRequired
	})
}

export default MyDeckSwiper