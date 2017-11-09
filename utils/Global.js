export const DECKS_STORAGE_KEY = 'DECKS_STORAGE_KEY'

export const PAGE = {
	DEFAULT: {
		val: 'DeckList',
		title: 'Decks'
	},
	DECK: {
		val: 'Deck',
		title: ''
	},
	DECK_SWIPER: {
		val: 'MyDeckSwiper',
		title: '',
	},
	CARD: {
		val: 'MyCard',
		title: ''
	}
};

export const UNPRESSED_TOUCHABLE_OPACITY = 1
export const PRESSED_TOUCHABLE_OPACITY = 0.4

export const NEW = 'NEW'
export const DEFAULT_SCORE = -1

// gets the current screen from navigation state
export const getCurrentRouteName = (navigationState) => {	
	if(!navigationState) {
		return null
	}

	if(!navigationState.routes) {
		return navigationState.routeName
	}

	const route = navigationState.routes[navigationState.index]

	if(!route) {
		return navigationState.routeName
	}

	// dive into nested navigators
	if(route.routes) {
		return getCurrentRouteName(route)
	}

	return route.routeName

}