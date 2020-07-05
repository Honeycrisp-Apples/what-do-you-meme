import React from 'react'

import {SafeAreaView, Text, Button} from 'react-native'
import Fire from "../constants/Fire"


// type Props = {
//   username?: string
// }

export default class Random extends React.Component {
  state = {
    user: this.props.username
  }
  getout = () => {
    Fire.shared.logout()
    this.props.navigation.navigate("Login")
    // this.props.navigation.navigate("TabOneNavigator")
    console.log('logged out. Did navigation happen?')
  }
  render(){
    return(
      <SafeAreaView>
        <Text>`Hello there, ${this.state.user}`</Text>
        <Button title={'LOGOUT'}
        onPress={()=> this.getout()}
        ></Button>
      </SafeAreaView>
    )
  }
}
