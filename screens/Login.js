import React from 'react'
import {ScrollView, View, Keyboard, SafeAreaView, Text, StyleSheet, Button, TextInput, Alert} from 'react-native'
import {Card} from 'react-native-paper'
import Fire from "../constants/Fire"
import firebase from 'firebase'

import {navigationOptions} from 'react-navigation'

import {FormButton, FormInput} from '../components/Reusables'
// interface Props {
//   navigation: { navigate: (arg0: string, arg1: { username: any }) => void }
// }
export default class Login extends React.Component{
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

  componentDidMount(){
    this.setState({
      email: "",
      password: ""
    })
  }

  static navigationOptions =  {
    // title: 'Create Your Character',
    headerShown: false
    // title: "tester2"
  };


  loggin = async () => {
    console.log("EMAIL: ", this.state.email)
    console.log("PASS: ", this.state.password)
    Fire.shared.login(this.state.email, this.state.password).then((user)=> {
      console.log("The logged in user is: ", user)
      this.props.navigation.navigate('Welcome', {username: user})
    })
    // .then(()=> this.props.navigation.navigate('Welcome', {username: "nope"}))
    .catch((err)=> alert(err.message))
  }

  // obAuth = (user: any) => {
  //   if(user){
  //     this.props.navigation.navigate('Welcome', {username: "nope"})
  //   }
  // }

  render(){
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView onPress={Keyboard.dismiss} contentContainerStyle={{height: '100%', flexGrow: 1, justifyContent: 'center',
      }}>
          <Text style={{fontSize: 24, color: 'white', alignSelf: 'center'}}>Welcome Back!</Text>
          <FormInput
          // style={styles.inputs}
          labelName={'EMAIL'}
          // placeholder={'EMAIL'}
          // placeholderTextColor= 'green'
          // label={'email'}
          // name='email'
          // borderColor={'blue'}
          value={this.state.email}
          onChangeText={(email)=> this.setState({email})}
          />
          <FormInput
          // style={styles.inputs}
          labelName={'PASSWORD'}
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(password)=> this.setState({password})}
          />
          <FormButton
          title="Login"
          modeValue='contained'
          // disabled
          uppercase={true}
          onPress={() => this.loggin()}
          />
          <FormButton
          title="Signup Here"
          modeValue='text'
          colorValue={'white'}
          uppercase={true}
          onPress={() => this.props.navigation.navigate("SignUp")}
          />
          <FormButton
          title="Meme API"
          modeValue='contained'
          theme={{colors: {primary: 'red'}}}
          uppercase={true}
          onPress={() => this.props.navigation.navigate("Memes")}
          />
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'center'
  },
  card: {
    // backgroundColor: 'blue',
    height: '100%',
    margin: 10,
    // flex: 1,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  inputs: {
    backgroundColor: "white",
    marginBottom: 10,
    // paddingVertical: 10,
    // borderColor: 'darkred',
    color: 'blue'
  }
})
