import { AsyncStorage } from 'react-native'
import update from 'immutability-helper'
import { DECKS_STORAGE_KEY } from './Global'

export function deleteAllDecks() {
	return AsyncStorage.removeItem(DECKS_STORAGE_KEY)
}

export async function getDecks(cb) {
	let err = null
	let res = null

	try {
		res = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
		if(!res) {
			return cb(err, [])
		}
	} catch(e) {
		return cb({errocode: 2, errmsg: 'Error while accessing AsyncStorage'}, res)
	}

	return cb(err, JSON.parse(res))
}

export function getDeck(id) {
	return AsyncStorage.getItem(DECKS_STORAGE_KEY)
		.then(res => {
			if(res === null) {
				return null
			}

			const deck = res.find(curr_deck => curr_deck.id === id)
			if(!deck) {
				return null
			}

			return JSON.parse(deck)
		})
}

export async function deleteDeck(id, cb) {
	let err = null
	let res = null

	try {
		let decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
		if(!decks) {
			throw new Error('Failed to access decks from AsyncStorage')
		}

		decks = JSON.parse(decks)

		const deck_index = decks.findIndex(deck => deck.id === id) 
		if(deck_index === -1) {
			throw new Error('Cannot find deck to be deleted')
		}
		const new_decks = update(decks, {
			$splice: [[ deck_index, 1 ]]
		})

		await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(new_decks))
	} catch(e) {
		err = { errcode: 1, errmsg: e.message }
	}

	return cb(err, res)
}


export async function saveDeckTitle({ is_new, id, title }, cb) {
	let err = null
	let res = null

	try {
		let decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY)
		let new_decks = null

		if(is_new) { // add new deck
			if(decks) {
				decks = JSON.parse(decks)
			} else {
				decks = []
			}

			new_decks = decks.concat({
				id,
				index: decks.length + 1,
				name: title,
				cards: [],
				num_cards: 0,
				is_selected: false
			})
		} else { // edit existing deck
			if(!decks) {
				throw new Error('Failed to access decks from AsyncStorage')
			} else {
				decks = JSON.parse(decks)
			}

			const deck_index = decks.findIndex(deck => deck.id === id)
			if(deck_index === -1) {
				throw new Error('Cannot find deck to be edit')
			} else {			
				new_decks = update(decks, {
					[deck_index]: {
						name: { $set: title }
					}
				})
			}
		}

		await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(new_decks))
	} catch(e) {
		const errmsg = e && e.message ? e.message : 'Failed to access decks from AsyncStorage'
		err = { errcode: 1, errmsg: errmsg }
	}

	return cb(err, res)
}

export async function addCardToDeck(deck_id, card, cb) {
	let err = null
	let res = null

	try {
		let decks = await AsyncStorage.getItem(DECKS_STORAGE_KEY)	
		if(!decks) {
			throw new Error('Failed to access decks from AsyncStorage')
		}

		decks = JSON.parse(decks)
		const deck_index = decks.findIndex(deck => deck.id === deck_id)

		if(deck_index === -1) {
			throw new Error('Failed to find deck to add card to')
		}

		card['index'] = decks[deck_index].cards.length + 1

		let new_decks = update(decks, {
			[deck_index]: {
				cards: { $push: [card]}
			}
		})

		await AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(new_decks))
	} catch(e) {
		err = { errcode: 1, errmsg: e.message }
	}


	return cb(err, res)
}