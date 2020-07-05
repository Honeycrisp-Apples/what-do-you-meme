import React from 'react'
import {View, SafeAreaView, Text, StyleSheet, Button, TextInput} from 'react-native'
import {Card} from 'react-native-paper'
import Fire from "../constants/Fire"

export default class Login extends React.Component{
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     email: "",
  //     password: ""
  //   }
  // }

  state = {
    email: "",
    password: ""
  }

  loggin = () => {
    console.log(this.state.email)
    console.log(this.state.password)
    Fire.shared.login(this.state.email, this.state.password)
  }

  render(){
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <TextInput style={styles.inputs}
          placeholder={'EMAIL'}
          placeholderTextColor= 'green'
          // label={'email'}
          // name='email'
          onChange={(email)=> this.setState({email})}
          />
          <TextInput style={styles.inputs}
          placeholder={'PASSWORD'}
          placeholderTextColor= 'green'
          // label={'password'}
          // name='password'
          onChange={(password)=> this.setState({password})}
          />
          <Button title="Login"
          onPress={() => this.loggin()}
          />
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
