import React from 'react'
import PropTypes from 'prop-types'
import { Footer, FooterTab, Button, Icon, Text } from 'native-base'
import { TabNavigator } from 'react-navigation'
import App from '../App'

const Tabs = TabNavigator({
	Home: {
		screen: App,
		navigatorOptions: {
			tabBarLabel: 'Home',
			tabBarIcon: () => <Icon name='home' size={30} />
		}
	}
})


const MyFooter = () => (
	<Tabs />
)

export default MyFooter