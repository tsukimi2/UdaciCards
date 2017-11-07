import { SET_HEADER_BTN_VISIBILITY } from './constants'

export function setHeaderBtnVisibility(visibility) {
console.log('visibility')
console.log(visibility)	
	return {
		type: SET_HEADER_BTN_VISIBILITY,
		showDeleteBtn: typeof visibility.showDeleteBtn !== 'undefined' ? visibility.showDeleteBtn : false,
		showEditBtn: typeof visibility.showEditBtn !== 'undefined' ? visibility.showEditBtn : false
	}
}