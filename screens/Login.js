import React from 'react'
import {ScrollView, View, Keyboard, SafeAreaView, Text, StyleSheet, Button, TextInput, Dimensions} from 'react-native'
import {Card} from 'react-native-paper'
import Fire from "../constants/Fire"
import firebase from 'firebase'

// import Video from "react-native-video";
import { Video } from 'expo-av';
const { width, height } = Dimensions.get("window");

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
      // this.props.navigation.navigate('Welcome', {username: user})
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
        <Video
          source={require("../assets/video/video-1.mp4")}
          // source={{uri: 'https://www.youtube.com/watch?v=9J6EB-KPc2o'}}
          style={styles.backgroundVideo}
          isMuted={true}
          repeat={true}
          resizeMode={"cover"}
          rate={1.0}
          shouldPlay
          isLooping
          // ignoreSilentSwitch={"obey"}
        />
        <View style={styles.overlay}></View>
        <ScrollView onPress={Keyboard.dismiss} contentContainerStyle={{height: '100%', flexGrow: 1, justifyContent: 'center', zIndex: 5
      }}>
          <Text style={{ fontFamily: 'FredokaOne_400Regular' , alignSelf: 'center', color: 'white', fontSize: 100, textAlign: 'center',}}>MEMER</Text>
          <Card style={styles.card}>
            <Text style={{fontSize: 30, color: 'white', alignSelf: 'center', fontFamily: "FredokaOne_400Regular", marginBottom: 30}}>WELCOME BACK</Text>
            <FormInput
            labelName={'EMAIL'}
            value={this.state.email}
            onChangeText={(email)=> this.setState({email})}
            />
            <FormInput
            labelName={'PASSWORD'}
            secureTextEntry={true}
            value={this.state.password}
            onChangeText={(password)=> this.setState({password})}
            />
            <FormButton
            title="Login"
            modeValue='contained'
            colorValue={'blue'}
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
          </Card>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  backgroundVideo: {
    height: height,
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0
  },
  overlay: {
    // zIndex: 7,
    backgroundColor: 'rgba(0,0,255,0.3)',
    height: height,
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  container: {
    flex: 1,
    // backgroundColor: 'grey',
    justifyContent: 'center'
  },
  card: {
    backgroundColor: 'rgba(0,0,139, 0.7)',
    // height: '100%',
    margin: 10,
    paddingVertical: 40
    // flex: 1,
    // flexGrow: 1,
    // justifyContent: "center",
    // alignItems: "flex-end"
  },
  inputs: {
    backgroundColor: "white",
    marginBottom: 10,
    // paddingVertical: 10,
    // borderColor: 'darkred',
    color: 'blue'
  }
})
