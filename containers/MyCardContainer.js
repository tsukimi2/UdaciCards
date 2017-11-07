import { connect } from 'react-redux'
import MyEditCard from '../components/MyEditCard'

const mapStateToProps = (state, ownProps) => {
	const { is_new } = ownProps.navigation.state.params

	return {
		is_new
	}
}

const mapDispatchToProps = dispatch => {
	return {

	}
}

const MyCardContainer = connect(mapStateToProps, mapDispatchToProps)(MyEditCard)

export default MyCardContainer