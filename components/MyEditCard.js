import React, { Component } from 'react'
import PropTypes from 'prop-types'
var uuid = require('uuid-v4')
import { Container, Content, Card, CardItem, Form, View, Text, Item, Input, Picker, Button } from 'native-base'
import * as Global from '../utils/Global'
import * as Api from '../utils/api'

class MyEditCard extends Component {
	constructor() {
		super()
		this.state = {
			question: '',
			ans: false
		}
	}

	handleQuestionChange(text) {
		this.setState({ question: text })
	}

	onChangeAns(ans: string) {
		this.setState({
			ans
		})
	}

	handleSubmit({ is_new, deck_id, card_id, question, ans }) {
		const { navigation } = this.props

		if(is_new) {
			const new_id = uuid()

			this.props.addCard({
				deck_id: deck_id,
				card_id: new_id,
				question: question,
				ans: ans
			})
			Api.addCardToDeck(deck_id, {
				id: new_id,
				question,
				ans
			}, (err) => {				
				if(err) {
					// ToDo: revert redux store and notify user
					console.log('err')
					console.log(err)
				}				
			})
			this.props.navigation.navigate("Deck", {
				navigation: this.props.navigation,
				is_edit: false,
				id: deck_id
			})
		} else {
/*			
			this.props.editCard({
				deck_id,
				card_id,
				question,
				ans
			})
*/			
		}
	}

	render() {
		const { is_new, deck_id, card_id } = this.props
		const { question, ans } = this.state

		return(
			<Container>
				<Content padder>
					<Card style={styles.card}>
						<CardItem cardBody>
							<Form>
								<View padder style={styles.card_body}>
									<Text>Question</Text>
									<Item regular>
										<Input
											name="question"
											multiline={true}
											placeholder="Enter your question"
											value={this.state.question}
											onChangeText={this.handleQuestionChange.bind(this)}
											style={styles.textarea}
										/>
									</Item>
									<View style={styles.picker_view}>
										<Text>Answer</Text>
										<Picker
											mode="dropdown"
											placeholder="Please click to select answer"
											selectedValue={this.state.ans}
											onValueChange={this.onChangeAns.bind(this)}
											style={styles.picker}
										>
											<Item label="Yes" value={true} />
											<Item label="No" value={false} />
										</Picker>
									</View>
									{
										question === '' ? (
											<Button disabled>
												<Text>Submit</Text>
											</Button>
										) : (
											<Button onPress={this.handleSubmit.bind(this, {
												is_new,
												deck_id,
												card_id,
												question,
												ans
											})}>
												<Text>Submit</Text>
											</Button>
										)
									}
								</View>
							</Form>
						</CardItem>
					</Card>
				</Content>
			</Container>
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
		flex: 1,
		justifyContent: 'space-around'
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
	},
	picker_view: {
		marginTop: 15,
		marginBottom: 15
	},
	picker: {
		borderWidth: 1,
		borderStyle: 'solid',
		borderColor: 'grey',
		alignSelf: 'stretch',
		width: 200
	},
	textarea: {
		width: 250,
		height: 150
	}
}

MyEditCard.propTypes = {
	is_new: PropTypes.bool.isRequired,
	deck_id: PropTypes.string.isRequired,
	card_id: PropTypes.string,
	question: PropTypes.string,
	ans: PropTypes.bool
}

MyEditCard.defaultProps = {
	card_id: Global.NEW,
	question: '',
	ans: false
}

export default MyEditCard