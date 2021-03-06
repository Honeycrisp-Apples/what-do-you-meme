import React from 'react'
import {ScrollView, Keyboard, SafeAreaView, Text, StyleSheet, Button, TextInput} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {Card} from 'react-native-paper'
import {FormButton, FormInput} from '../components/Reusables'
import Fire from '../constants/Fire'
// type Props = {
//   nothing?: string
// }
// interface TheState {
//   username: string,
//   email: string,
//   password: string
// }
export default class SignUp extends React.Component{
  // constructor(){
  //   super()
  //   this.state = {
  //     username: '',
  //     email: "",
  //     password: ""
  //   }
  // }

  componentDidMount(){
    this.setState({
      username: "",
      email: "",
      password: "",
      passConfirm:""
    })
  }

  static navigationOptions =  {
    // title: 'Create Your Character',
    headerShown: false
    // title: "tester2"
  };

  state = {
    username: '',
    email: "",
    password: ""
  }

  signin = () => {
    if(this.state.username.length === 0){
      alert('Must have a username.')
      //maybe think of how to find unique
      return
    }
    if(this.state.passConfirm !== this.state.password){
      alert("Passwords do not match.")
      return;
    }

    console.log("EMAIL:", this.state.email)
    console.log("PASS:",this.state.password)
    console.log("USERNAME:",this.state.username)
    Fire.shared.createUser(this.state.email, this.state.password, this.state.username)
    .then((cred) => {
      console.log("success")
      if (cred.user){
        let user = cred.user
        console.log("NEW USER:", user)
        user.updateProfile({displayName: this.state.username})
        .then(async() => {
          console.log("CRED DISPLAYNAME: ", cred.user?.displayName)
          await Fire.shared.makeUser(user)
          .then(()=> this.props.navigation.navigate("Welcome"))
          .catch((err)=> console.log("Error making user object: ", err))
        })
      }
      console.log("The new cred: ", cred)
    })
    // .then(() => {
    //   console.log('made an account!!')
    //   this.props.navigation.navigate("Welcome")
    // })
    .catch((err) => alert(err.message))
  }

  // handleChange = (evt: { target: { name: any; value: any } }) => {
  //   this.setState({
  //     username: evt.target.value
  //   })
  // }
  // handleUsername(e: React.ChangeEvent<HTMLInputElement>) {this.setState({username: e.target.value});}
  // handleEmail(e: React.ChangeEvent<HTMLInputElement>) {this.setState({email: e.target.value});}
  // handlePassword(e: React.ChangeEvent<HTMLInputElement>) {this.setState({password: e.target.value});}

  // onChangeText = (key: string) => (val: string) => this.setState({[key] : val})
  render(){
    return (
      <KeyboardAwareScrollView
      style={{ backgroundColor: '#4c69a5' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={{flex: 1}}
      scrollEnabled={false}
      >
      <SafeAreaView style={styles.container}>
        <ScrollView  contentContainerStyle={styles.card}
        // onPress={Keyboard.dismiss}
        >
        <Text style={{fontSize: 50, color: 'white', alignSelf: 'center', fontFamily: "FredokaOne_400Regular", textAlign: 'center' }}>CREATE AN ACCOUNT</Text>
          <FormInput
          // style={styles.inputs}
          modeValue="outlined"
          placeholder={'USERNAME'}
          placeholderTextColor= 'green'
          // label='username'
          // name={'username'}
          value={this.state.username}
          onChangeText={(username) => this.setState({username})}
          />
          <FormInput
          // style={styles.inputs}
             placeholder={'EMAIL'}
             placeholderTextColor= 'green'
          // label='email'
          // name='email'
          value={this.state.email}
          onChangeText={(email)=> this.setState({email})}
          />
          <FormInput
          // style={styles.inputs}
          placeholder={'PASSWORD'}
          // placeholderTextColor= 'green'
          // label='password'
          // name='password'
          secureTextEntry={true}
          value={this.state.password}
          onChangeText={(password)=> this.setState({password})}
          />
          <FormInput
          // style={styles.inputs}
          placeholder={'CONFIRM PASSWORD'}
          // placeholderTextColor= 'green'
          // label='password'
          // name='password'
          secureTextEntry={true}
          value={this.state.passConfirm}
          onChangeText={(passConfirm)=> this.setState({passConfirm})}
          />
          <FormButton
          title="SIGNUP"
          modeValue="contained"
          colorValue={'blue'}
          onPress={() => this.signin()}
          />
           <FormButton
          title="login here"
          uppercase={true}
          colorValue={'white'}
          modeValue="text"
          onPress={() => this.props.navigation.navigate('Intro')}
          />
        </ScrollView>
      </SafeAreaView>
      </KeyboardAwareScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'blue'
  },
  card: {
    backgroundColor: 'rgba(0,0,139, 0.7)',
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
