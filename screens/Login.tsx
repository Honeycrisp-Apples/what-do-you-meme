import React from 'react'
import {View, SafeAreaView, Text, StyleSheet, Button, TextInput} from 'react-native'
import {Card} from 'react-native-paper'
import Fire from "../constants/Fire"
import firebase from 'firebase'
interface Props {
  navigation: { navigate: (arg0: string, arg1: { username: any }) => void }
}
export default class Login extends React.Component<Props>{
  // constructor(props: Props){
  //   super(props)
  //   // this.state = {
  //   //   email: "",
  //   //   password: ""
  //   // }
  //   // firebase.auth().onAuthStateChanged(this.obAuth)
  // }

  state = {
    email: "",
    password: ""
  }

  loggin = async () => {
    console.log("EMAIL: ", this.state.email)
    console.log("PASS: ", this.state.password)
    Fire.shared.login(this.state.email, this.state.password).then((user)=> {
      console.log("The logged in user is: ", user)
      // this.props.navigation.navigate('Welcome', {username: user})
    })
    .then(()=> this.props.navigation.navigate('Welcome', {username: "nope"}))
  }

  // obAuth = (user: any) => {
  //   if(user){
  //     this.props.navigation.navigate('Welcome', {username: "nope"})
  //   }
  // }

  render(){
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <TextInput style={styles.inputs}
          placeholder={'EMAIL'}
          placeholderTextColor= 'green'
          // label={'email'}
          // name='email'
          value={this.state.email}
          onChangeText={(email)=> this.setState({email})}
          />
          <TextInput style={styles.inputs}
          placeholder={'PASSWORD'}
          placeholderTextColor= 'green'
          // label={'password'}
          // name='password'
          value={this.state.password}
          onChangeText={(password)=> this.setState({password})}
          />
          <Button title="Login"
          onPress={() => this.loggin()}
          />
          {/* <Button title="SignUp"
          onPress={() => this.loggin()}
          /> */}
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black'
  },
  card: {
    margin: 10,
    flex: 1,
    justifyContent: "center"
  },
  inputs: {
    backgroundColor: "white",
    marginBottom: 10,
    paddingVertical: 10,
    color: 'blue'
  }
})
