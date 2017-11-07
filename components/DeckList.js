import React, {Component} from 'react'
import {subscribe} from 'redux-subscriber'
import update from 'immutability-helper'
import PropTypes from 'prop-types'
import { Container, Content, Card, CardItem, Body, View, Text } from 'native-base'
import * as Global from '../utils/Global'
import DeckListItem from './DeckListItem'
import MyFabsBarContainer from '../containers/MyFabsBarContainer'

class DeckList extends Component {
  constructor() {
    super(...arguments)
    this.state = {
      num_items_selected: 0
    }

    this.onItemSelected = this.onItemSelected.bind(this)
    this.onItemDeselected = this.onItemDeselected.bind(this)
  }

  componentWillMount() {
    this.props.setPage({ val: Global.PAGE.DEFAULT.val, title: '' })

    this.unsubsribe_state_mark_decks_delete_flag = subscribe('signal_flags.decks_delete_flag', state => {
      if(state.signal_flags.decks_delete_flag === true) {
        this.setState({ num_items_selected: 0 })
        this.props.setDecksDeleteFlag(false)
      }
    })

    this.unsubscribeUpdateClearDecklistPageStateFlag = subscribe('signal_flags.update_clear_decklist_state_flag', state => {
      if(state.signal_flags.update_clear_decklist_state_flag === true) {
        this.clearState()
      }
    })
  }

  clearState() {
    this.setState({ num_items_selected: 0 })
    this.props.updateClearDecklistStateFlag(false)
    this.props.updateAllDecksIsSelected(false)
  }

  componentWillUnmount() {
    this.unsubscribeUpdateClearDecklistPageStateFlag()
  }

  gotoAddDeckForm() {
    if(this.state.num_items_selected !== 0) {
      this.props.setHeaderBtnVisibility({ showDeleteBtn: false, showEditBtn: false })
    }
    this.setState({ num_items_selected: 0 })

    this.props.navigation.navigate("Deck", {
      is_edit: true,
      id: Global.NEW,
      name: '',
      num_cards: 0,
 //     score: 0,
//      setPage: this.props.setPage
    })         
  }

  onItemSelected(id) {
    // update deck's is_selected prop in redux   
    this.props.updateDeckIsSelected(id, true)
 
    if(this.state.num_items_selected === 0) {
      // show delete and edit buttons     
      this.props.setHeaderBtnVisibility({ showDeleteBtn: true, showEditBtn: true })
    }
    this.setState({ num_items_selected: this.state.num_items_selected + 1 })
  }

  onItemDeselected(id) { 
    // update deck's is_selected prop in redux 
    this.props.updateDeckIsSelected(id, false)
    if(this.state.num_items_selected === 1) {
      this.props.setHeaderBtnVisibility({ showDeleteBtn: false, showEditBtn: false })
    }
    this.setState({ num_items_selected: this.state.num_items_selected > 0 ? this.state.num_items_selected - 1 : 0 })
  }

  render() {
    const { decks, navigation, setPage, showContextMenu } = this.props

    return(
      <Container>
        <Content padder>
        {
          decks.map(deck => (
            <DeckListItem
              key={deck.id}
              num_items_selected={this.state.num_items_selected}
              navigation={navigation}
              setPage={setPage}
              showContextMenu={showContextMenu}
              onItemSelected={this.onItemSelected}
              onItemDeselected={this.onItemDeselected}
              {...deck}
            />
          ))
        }
        </Content>
        <MyFabsBarContainer
          onAdd={this.gotoAddDeckForm.bind(this)}
          navigation={navigation}
        />
      </Container>
    )
  }
}

DeckList.propTypes = {
  decks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      num_cards: PropTypes.number.isRequired,
 //     score: PropTypes.number.isRequired,
      is_selected: PropTypes.bool.isRequired
    })
  ),
  setDecksDeleteFlag: PropTypes.func.isRequired,
  setPage: PropTypes.func.isRequired,
  showContextMenu: PropTypes.func.isRequired,
  hideContextMenu: PropTypes.func.isRequired,
  updateDeckIsSelected: PropTypes.func.isRequired
}

export default DeckList