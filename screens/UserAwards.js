import React from 'react'
import {Text, SafeAreaView, Button} from 'react-native'
export default class UserAwards extends React.Component{
  render(){
    return (
      <SafeAreaView>
        <Text>Hi there!!!</Text>
        <Button
        title={'To UserMain'}
        onPress={()=> this.props.navigation.navigate("UserMain")}
        ></Button>
        <Button
        title={'To Friends'}
        onPress={()=> this.props.navigation.navigate("UserFriends")}
        ></Button>
        {/* <Button
        title={'To Friends'}
        onPress={()=> this.props.navigation.navigate("UserFriends")}
        ></Button> */}
      </SafeAreaView>
      )
  }
}
