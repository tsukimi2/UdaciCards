import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View, Fab, Icon, Button } from 'native-base'
import EntypoIcon from 'react-native-vector-icons/Entypo'
import * as Global from '../utils/Global'

class MyFabsBar extends Component {
	constructor() {
		super(...arguments)
	    this.state = {
	      active: false
	    }	
	}

	handleAdd() {
		this.props.onAdd()
	}

	handleEdit() {
		this.props.onEdit()
	}

	handleDelete() {
		this.props.onDelete()
	}

	render() {		
		const { page } = this.props

		if(page.val === Global.PAGE.DEFAULT.val) {
			if(page.show_context_menu === false) {
				return(
					<View style={{ flex: 1 }}>
						<Fab
							active={false}
							direction="up"
							containerStyle={{ }}
							style={{ backgroundColor: '#5067FF' }}
							position="bottomRight"
							onPress={this.handleAdd.bind(this)}>
							<EntypoIcon name="plus" />
						</Fab>
					</View>
				)
			} else {		
				return(
					<View style={{ flex: 1 }}>
						<Fab
							active={this.state.active}
							direction="up"
							containerStyle={{ }}
							style={{ backgroundColor: '#5067FF' }}
							position="bottomRight"
							onPress={() => this.setState({ active: !this.state.active })}
						>
							<EntypoIcon name="share" />
							<Button style={{ backgroundColor: '#34A34F' }}>
								<EntypoIcon name="plus" />
							</Button>
							<Button style={{ backgroundColor: '#3B5998' }}>
								<EntypoIcon name="edit" />
							</Button>
							<Button style={{ backgroundColor: '#DD5144' }}>
								<Icon name="trash" />
							</Button>
							<Button style={{ backgroundColor: '#34A34F' }}>
								<Icon name="list" />
							</Button>
						</Fab>
					</View>
				)
			}
		} else if(page.val === Global.PAGE.DECK.val) {
			return(
				<View style={{ flex: 1 }}>
					<Fab
						active={this.state.active}
						direction="up"
						containerStyle={{ }}
						style={{ backgroundColor: '#5067FF' }}
						position="bottomRight"
						onPress={() => this.setState({ active: !this.state.active })}
					>
						<EntypoIcon name="share" />
						<Button style={{ backgroundColor: '#34A34F' }} onPress={this.handleAdd.bind(this)}>
							<EntypoIcon name="plus" />
						</Button>
						<Button style={{ backgroundColor: '#3B5998' }} onPress={this.handleEdit.bind(this)}>
							<EntypoIcon name="edit" />
						</Button>
						<Button style={{ backgroundColor: '#DD5144' }} onPress={this.handleDelete.bind(this)}>
							<Icon name="trash" />
						</Button>						
					</Fab>
				</View>
			)		
		}

		return(
			<View style={{ flex: 1 }}></View>
		)
	}
}

MyFabsBar.propTypes = {
	onAdd: PropTypes.func,
	onEdit: PropTypes.func
}

export default MyFabsBar