import { connect } from 'react-redux'
import * as Global from '../utils/Global'
import MyHeader from '../components/MyHeader'
import { deleteItems, markDecksDeleteFlag, setHeaderBtnVisibility, setPage } from '../actions'

const getPageTitle = page => {
	if(page.val === Global.PAGE.DEFAULT.val) {
		return Global.PAGE.DEFAULT.title
	}

	return page.title
}

const mapStateToProps = (state, ownProps) => {
	return {
		title: getPageTitle(state.page) || '',
		//showBackBtn: state.page === Global.PAGE.DEFAULT.VAL ? true : false,
		showBackBtn: true,
		showDeleteBtn: state.ui.showDeleteBtn,
		showEditBtn: state.ui.showEditBtn,
		state: state,
		navigation: ownProps.navigation.navigation,
//		onEditClick: ownProps.onEdit !== 'undefined' ? ownProps.onEdit : () => { return{} }
	}
}

const mapDispatchToProps = dispatch => {
	return {
		onDeleteClick: (curr_route_name) => {
			dispatch(deleteItems(curr_route_name))
			dispatch(setHeaderBtnVisibility({ showDeleteBtn: false, showEditBtn: false }))
			dispatch(markDecksDeleteFlag(true))
		},
		setHeaderBtnVisibility: (visibility) => {
			dispatch(setHeaderBtnVisibility(visibility))
		},
		setPage: page => {
			dispatch(setPage(page))
		}
	}
}

const MyHeaderContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MyHeader)

export default MyHeaderContainer