import { SET_CURR_PAGE, SHOW_CONTEXT_MENU, HIDE_CONTEXT_MENU } from '../actions/constants'
import * as Global from '../utils/Global'

const init_state = {
	page: {
		val: Global.PAGE.DEFAULT.val,
		title: Global.PAGE.DEFAULT.title,
		show_context_menu: false
	}
}

function page(state = init_state, action) {
	const { page } = action

	switch(action.type) {
		case SET_CURR_PAGE:		
			if(typeof page.title !== 'undefined') {
				return {
					...state,
					val: page.val,
					title: page.title
				}				
			}

			return {
				...state,
				val: page.val
			}
		case SHOW_CONTEXT_MENU:		
			return {
				...state,
				show_context_menu: true
			}
		case HIDE_CONTEXT_MENU:
			return {
				...state,
				show_context_menu: false
			}
		default:
			return state
	}
}

export default page
