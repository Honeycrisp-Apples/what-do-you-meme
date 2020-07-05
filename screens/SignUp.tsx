import React from 'react'
import {ScrollView, Keyboard, SafeAreaView, Text, StyleSheet, Button, TextInput} from 'react-native'
import {Card} from 'react-native-paper'

import Fire from '../constants/Fire'
type Props = {
  nothing?: string
}
interface TheState {
  username: string,
  email: string,
  password: string
}
export default class SingUp extends React.Component<Props, TheState>{
  // constructor(){
  //   super()
  //   this.state = {
  //     username: '',
  //     email: "",
  //     password: ""
  //   }
  // }

  // componentDidMount(){
  //   this.setState({
  //     username: "",
  //     email: "",
  //     password: ""
  //   })
  // }
  state = {
    username: '',
    email: "",
    password: ""
  }

  signin = () => {
    console.log("EMAIL:", this.state.email)
    console.log("PASS:",this.state.password)
    console.log("USERNAME:",this.state.username)
    Fire.shared.createUser(this.state.email, this.state.password, this.state.username)
  }

  handleChange = (evt: { target: { name: any; value: any } }) => {
    this.setState({
      username: evt.target.value
    })
  }
  handleUsername(e: React.ChangeEvent<HTMLInputElement>) {this.setState({username: e.target.value});}
  handleEmail(e: React.ChangeEvent<HTMLInputElement>) {this.setState({email: e.target.value});}
  handlePassword(e: React.ChangeEvent<HTMLInputElement>) {this.setState({password: e.target.value});}

  // onChangeText = (key: string) => (val: string) => this.setState({[key] : val})
  render(){
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView  contentContainerStyle={styles.card}
        // onPress={Keyboard.dismiss}
        >
          <TextInput style={styles.inputs}
          placeholder={'USERNAME'}
          placeholderTextColor= 'green'
          // label='username'
          // name={'username'}
          value={this.state.username}
          onChangeText={(username) => this.setState({username})}
          />
          <TextInput style={styles.inputs}
             placeholder={'EMAIL'}
             placeholderTextColor= 'green'
          // label='email'
          // name='email'
          value={this.state.email}
          onChangeText={(email)=> this.setState({email})}
          />
          <TextInput style={styles.inputs}
             placeholder={'PASSWORD'}
             placeholderTextColor= 'green'
          // label='password'
          // name='password'
          value={this.state.password}
          onChangeText={(password)=> this.setState({password})}
          />
          <Button title="SIGNUP"
          onPress={() => this.signin()}
          />
        </ScrollView>
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
    color: 'blue',

  }
})
