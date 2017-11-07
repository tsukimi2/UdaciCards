import React, { Component } from 'react'
import { StackNavigator } from 'react-navigation'
//import { Content } from 'native-base'
import { Container, Header, Content, List, ListItem, Text } from 'native-base'
import { View, TouchableOpacity } from 'react-native'
import DeckList from './DeckList'

const ScreenDeckList = ({ navigation }) => (
   <View>
    <Text>This is the Home view</Text>
    <TouchableOpacity>
      <Text>Press here for the Dashboard</Text>
    </TouchableOpacity>
      <Text>This is the Home view</Text>
    <TouchableOpacity>
      <Text>Press here for the Dashboard</Text>
    </TouchableOpacity>
        <Text>This is the Home view</Text>
    <TouchableOpacity>
      <Text>Press here for the Dashboard</Text>
    </TouchableOpacity>
        <Text>This is the Home view</Text>
    <TouchableOpacity>
      <Text>Press here for the Dashboard</Text>
    </TouchableOpacity>  
  </View>
)

const Stack = StackNavigator({	
	Home: {
		screen: ScreenDeckList
	}
})

class MyApp extends Component {
	render() {
		return(
			<Content>
 				<Stack />
			</Content>
		)
	}
}

export default MyApp