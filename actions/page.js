import { SET_CURR_PAGE, SHOW_CONTEXT_MENU, HIDE_CONTEXT_MENU } from './constants'

export function setPage(page) {	
	return {
		type: SET_CURR_PAGE,
		page
	}
}

export function showContextMenu() {	
	return {
		type: SHOW_CONTEXT_MENU
	}
}

export function hideContextMenu() {
	return {
		type: HIDE_CONTEXT_MENU
	}
}