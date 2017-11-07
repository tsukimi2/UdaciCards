import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardItem, View, Text, Left, Body, Button } from 'native-base'
import FAIcon from 'react-native-vector-icons/FontAwesome'
import EntypoIcon from 'react-native-vector-icons/Entypo'


class MyCard extends Component {
	constructor() {
		super()
		this.state = {
			show_ans: false,
			is_correct: false
		}		
	}

	handleAnswer(ans, id) {
		const correct_ans = this.props.ans

		// check answer with state
		if(ans === correct_ans) {
			this.props.callbacks.incrDeckScore()
			this.setState({ is_correct: true, show_ans: true })
		} else {
			this.props.callbacks.decrDeckScore()
			this.setState({ is_correct: false, show_ans: true })
		}


		this.props.updateStateUponAns()
	}

	renderAnsTxt(show_ans, ans, is_correct) {
		if(show_ans) {
			if(is_correct) {
				return (
					<View>
						<Text>Right!</Text>
						<Text note>{ans}</Text>
					</View>
				)			
			} else {
				return (
					<View>
						<Text>Wrong!</Text>
						<Text note>{ans}</Text>
					</View>
				)
			}
		}

		return(
			<View></View>
		)
	}
	
	render() {
		const { deck_name, is_new, is_edit, id, question, ans, card_num, score, num_cards, num_cards_ans } = this.props
		const { show_ans, is_correct } = this.state
	
		return(
			<Card style={styles.card}>
				<CardItem>
					<Left>
						<Body>
							<Text>Question {card_num}</Text>
						</Body>
					</Left>
				</CardItem>
				<CardItem cardBody>
					<View padder style={styles.card_body}>
						<Text>{question}</Text>
						{ this.renderAnsTxt(show_ans, ans, is_correct) }
					</View>
					{
						!show_ans && (
							<View style={styles.card_buttons_view}>
								<Button onPress={this.handleAnswer.bind(this, true, id)} style={styles.card_button}>
									<Text>Yes</Text>
								</Button>
								<Button onPress={this.handleAnswer.bind(this, false, id)} style={styles.card_button}>
									<Text>No</Text>
								</Button>
							</View>
						)
					}
				</CardItem>
				<CardItem>
					<Body>
						<Text note>Score: <FAIcon name="check-circle" style={styles.icon_correct}/> { score } <EntypoIcon name="circle-with-cross" style={styles.icon_incorrect}/> { num_cards_ans - score } </Text>					
						<Text note>Total: {num_cards}</Text>
						<Text note>Remaining: {num_cards - num_cards_ans}</Text>
					</Body>
				</CardItem>
			</Card>
		)
	}
}

const styles = {
	card: {
		elevation: 3,
		minHeight: 300
	},
	card_body: {
		minHeight: 200,
		flex: 1	
	},
	card_buttons_view: {
		flex: 1,
		flexDirection: 'row',	
		alignItems: 'center',
		justifyContent: 'center',		
	},
	card_button: {
		marginLeft: 3,
		marginRight: 3
	},
	icon_correct: {
		color: 'green'
	},
	icon_incorrect: {
		color: 'red'
	}
}

MyCard.propTypes = {	
//	is_new: PropTypes.boolean.isRequired,
//	is_edit: PropTypes.boolean.isRequired,
	id: PropTypes.string.isRequired,
	question: PropTypes.string.isRequired,
	ans: PropTypes.bool.isRequired,
	card_num: PropTypes.number.isRequired,
	score: PropTypes.number.isRequired,
	num_cards: PropTypes.number.isRequired,
	callbacks: PropTypes.shape({
		incrDeckScore: PropTypes.func.isRequired,
		decrDeckScore: PropTypes.func.isRequired
	}),
	updateStateUponAns: PropTypes.func.isRequired	
}

export default MyCard