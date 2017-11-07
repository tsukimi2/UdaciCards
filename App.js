import React, {Component} from 'react'
import Expo from "expo"
import MyRoot from './components/MyRoot'

export default class App extends Component {
	constructor() {
		super()
		this.state = {
			is_ready: false
		}
	}

	async componentWillMount() {
		await Expo.Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
			Ionicons: require("native-base/Fonts/Ionicons.ttf")			
		})
		this.setState({ is_ready: true })
	}

	render() {
		if(!this.state.is_ready) {
			return <Expo.AppLoading />
		}

		return <MyRoot />
	}


  render() {
    return (
      <MyRoot />
    )
  }
}