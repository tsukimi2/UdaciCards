import React from 'react'
import MyHeaderContainer from '../containers/MyHeaderContainer'
import DeckList from '../containers/DeckListContainer'
//import Deck from '../components/Deck'
import Deck from '../containers/DeckContainer'
import MyDeckSwiper from '../containers/MyDeckSwiperContainer'
import MyCardContainer from '../containers/MyCardContainer'

const Routes = {
	DeckList: {
		screen: DeckList,
		navigationOptions: {
			header: (navigation) => (<MyHeaderContainer navigation={navigation} />)
		}
	},
	Deck: {
		screen: Deck,
		navigationOptions: {
			header: (navigation) => (<MyHeaderContainer navigation={navigation} />)
		}
	},
	MyDeckSwiper: {
		screen: MyDeckSwiper,
		navigationOptions: {
			header: (navigation) => (<MyHeaderContainer navigation={navigation} />)
		}
	},
	EditCard: {
		screen: MyCardContainer,
		navigationOptions: {
			header: (navigation) => (<MyHeaderContainer navigation={navigation} />)
		}
	}
}

export default Routes

