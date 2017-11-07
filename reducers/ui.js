import { SET_HEADER_BTN_VISIBILITY } from '../actions/constants'

const init_state = {
	showDeleteBtn: false,
	showEditBtn: false
}

function ui(state=init_state, action) {
	switch(action.type) {
		case SET_HEADER_BTN_VISIBILITY:
			const { showDeleteBtn, showEditBtn } = action
			
			return {
				...state,
				showDeleteBtn: showDeleteBtn,
				showEditBtn: showEditBtn
			}		
		default:
			return state
	}
}

export default ui