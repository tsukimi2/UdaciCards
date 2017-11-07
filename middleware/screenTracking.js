import { NavigationActions } from 'react-navigation'
import * as Global from '../utils/Global'
import { setPage, updateClearDecklistStateFlag } from '../actions'

const screenTracking = store => next => (action) => {	
	if(action.type !== NavigationActions.NAVIGATE && action.type !== NavigationActions.BACK) {
		return next(action)
	}

	const currentScreen = Global.getCurrentRouteName(store.getState().nav)
	const result = next(action)	
	const nextScreen = Global.getCurrentRouteName(store.getState().nav)

	if(nextScreen !== currentScreen) {		
		if(nextScreen === Global.PAGE.DEFAULT.val) {		
			store.dispatch(setPage({ val: nextScreen, title: Global.PAGE.DEFAULT.title }))
		} else if(nextScreen === Global.PAGE.DECK.val) {
			store.dispatch(setPage({ val: nextScreen }))
		}

		if(currentScreen === Global.PAGE.DEFAULT.val) {			
			store.dispatch(updateClearDecklistStateFlag(true))
		}
	}

	return result
}

export default screenTracking