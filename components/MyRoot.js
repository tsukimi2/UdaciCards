import React, { Component } from 'react'
import { Provider, connect } from 'react-redux'
import { Container } from 'native-base'
import { StackNavigator, addNavigationHelpers } from "react-navigation";
import Routes from "../config/routes"
import configureStore from '../configureStore'

const AppNavigator = StackNavigator(Routes)

const navReducer = (state, action) => {
    const newState = AppNavigator.router.getStateForAction(action, state)
    return newState || state
}

const store = configureStore(navReducer)

@connect(state => ({
    nav: state.nav
}))
class AppWithNavigationState extends Component {
    render() {
        return (
            <AppNavigator
                navigation={addNavigationHelpers({
                    dispatch: this.props.dispatch,
                    state: this.props.nav
                })}
            />
        )
    }
}

const MyRoot = () => (
	<Provider store={store}>
		<AppWithNavigationState />
	</Provider>
)

export default MyRoot