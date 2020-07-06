import React from 'react'

import {SafeAreaView, Text, Button} from 'react-native'
import Fire from "../constants/Fire"


type Props = {
  navigation: { navigate: (arg0: string) => void, state: {params: {username? : string}} },
  username?: string
}
interface AState {
  user: any
}

export default class Welcome extends React.Component<Props, AState> {
  state = {
    // user: this.props.navigation.state.params.username
    user: Fire.shared.getUser()
  }
  componentDidMount(){
    this.setState({
      user: Fire.shared.getUser()
    })
  }
  getout = () => {
    Fire.shared.logout()
    this.props.navigation.navigate("Login")
    // this.props.navigation.navigate("TabOneNavigator")
    console.log(this.state.user)
    console.log('logged out. Did navigation happen?')
  }
  render(){
    return(
      <SafeAreaView>
        <Text>{`Hello there, ${this.state.user}`}</Text>
        <Button title={'LOGOUT'}
        onPress={()=> this.getout()}
        ></Button>
      </SafeAreaView>
    )
  }
}
