import { connect } from 'react-redux'
import MyFabsBar from '../components/MyFabsBar'

const mapStateToProps = (state, ownProps) => {
	return {
		page: state.page,
		navigation: ownProps.navigation,
		onAdd: typeof ownProps.onAdd !== 'undefined' ? ownProps.onAdd : () => { return{} },
		onEdit: typeof ownProps.onEdit !== 'undefined' ? ownProps.onEdit: () => { return{} },
		onDelete: typeof ownProps.onDelete !== 'undefined' ? ownProps.onDelete: () => { return{} }
	}
}

const MyFabsBarContainer = connect(
	mapStateToProps
)(MyFabsBar)

export default MyFabsBarContainer