import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Header, Content, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Body, Icon, Button } from 'native-base'
import MyFabsBarContainer from '../containers/MyFabsBarContainer'
import MyCard from './MyCard'

class MyDeckSwiper extends Component {
	constructor() {
		super()
		this.state = {
			score: 0,
			num_cards_ans: 0
		}		
	}

	handleIncrDeckScore() {		
		//const { id } = this.props
		//this.props.incrDeckScore(id)

		const num_cards = this.props.cards.length
		const  { score, num_cards_ans } = this.state

		this.setState({
			score: score + 1,
			num_cards_ans: num_cards_ans !== num_cards ? num_cards_ans + 1 : num_cards
		})
	}

	handleDecrDeckScore() {	
		//const { id } = this.props
		//this.props.decrDeckScore(id)

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
	}

	renderSwipeButtons() {

	}

	render() {
		const { navigation, cards, deck_name, /* score, num_cards_ans, */ incrDeckScore, decrDeckScore } = this.props
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
										<Text>Your score is {score} / {cards.length - 1}</Text>
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
									key={id}
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
	cards: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			index: PropTypes.number.isRequired,
			question: PropTypes.string.isRequired,
			ans: PropTypes.bool.isRequired
		})
	),
//	setPage: PropTypes.func.isRequired,
	callbacks: PropTypes.shape({
		incrDeckScore: PropTypes.func.isRequired,
		decrDeckScore: PropTypes.func.isRequired
	})
}

export default MyDeckSwiper