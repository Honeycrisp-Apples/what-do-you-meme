import React, {useState} from 'react'
import {View, SafeAreaView, Text, ScrollView, StyleSheet, Dimensions, KeyboardAvoidingView, Platform} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {FormButton, FormInput} from '../components/Reusables'
import {AppLoading} from 'expo'
import { Video } from 'expo-av';
import {Card} from 'react-native-paper'
import Fire from '../constants/Fire'
const { width, height } = Dimensions.get("window");
import {
  useFonts,
  Modak_400Regular,
  FredokaOne_400Regular,
  ConcertOne_400Regular,
  Bungee_400Regular,
  BungeeHairline_400Regular,
  BungeeInline_400Regular,
  BungeeOutline_400Regular,
  BungeeShade_400Regular,
  TitanOne_400Regular,
  Coiny_400Regular,
  ZillaSlabHighlight_400Regular,
  ZillaSlabHighlight_700Bold,
  ZillaSlab_700Bold
} from '@expo-google-fonts/dev';

export function Intro (props){
  let [fontsLoaded] = useFonts({
    Modak_400Regular,
    FredokaOne_400Regular,
    ConcertOne_400Regular,
    Bungee_400Regular,
    BungeeInline_400Regular,
    BungeeHairline_400Regular,
    BungeeOutline_400Regular,
    BungeeShade_400Regular,
    TitanOne_400Regular,
    Coiny_400Regular,
    ZillaSlabHighlight_400Regular,
    ZillaSlabHighlight_700Bold,
    ZillaSlab_700Bold
  });

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dispCard, setDispCard] = useState(false)


  const loggin = async () => {
    console.log("EMAIL: ", email)
    console.log("PASS: ", password)
    Fire.shared.login(email, password).then((user)=> {
      console.log("The logged in user is: ", user)
      // this.props.navigation.navigate('Welcome', {username: user})
    })
    // .then(()=> this.props.navigation.navigate('Welcome', {username: "nope"}))
    .catch((err)=> alert(err.message))
  }


  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return(
      <KeyboardAwareScrollView
      style={{ backgroundColor: '#4c69a5' }}
      resetScrollToCoords={{ x: 0, y: 0 }}
      contentContainerStyle={{flex: 1}}
      scrollEnabled={false}
      >
       {/* <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS == "ios" ? "padding" : "height"}
       // keyboardVerticalOffset={Platform.select({ios: 0, android: 500})}
       > */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'blue' }}>
        <Video
          source={require("../assets/video/video-1.mp4")}
          // source={{uri: 'https://www.youtube.com/watch?v=9J6EB-KPc2o'}}
          style={styles.backgroundVideo}
          isMuted={true}
          repeat={true}
          resizeMode={"cover"}
          rate={0.6}
          shouldPlay
          isLooping
          // ignoreSilentSwitch={"obey"}
        />
         <View style={styles.overlay}></View>
        <SafeAreaView style={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center',}}>
          <ScrollView contentContainerStyle={{flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center',}}>
          <Text style={{ fontFamily: 'FredokaOne_400Regular' , color: 'white', fontSize: 100, textAlign: 'center', marginTop: 'auto'}}>MEMER</Text>
          <Text style={{ fontFamily: 'FredokaOne_400Regular' , color: 'white', fontSize: 30, textAlign: 'center',}}> MAKE ME LAUGH </Text>
          {/* <Text style={{ fontFamily: 'ZillaSlab_700Bold' , color: 'white', fontSize: 100, textAlign: 'center'}}>MEMER</Text> */}


          <View style={{marginTop: 'auto', marginBottom: 20, width: width}}>
            {
              (dispCard) ? (
              <Card style={styles.card}>
                <FormInput
                labelName={'EMAIL'}
                value={email}
                onChangeText={(email)=> setEmail(email)}
                />
                <FormInput
                labelName={'PASSWORD'}
                secureTextEntry={true}
                value={password}
                onChangeText={(password)=> setPassword(password)}
                />
                <FormButton
                title="Welcome Back"
                modeValue='contained'
                colorValue={'blue'}
                uppercase={true}
                onPress={() => loggin()}
                />
                <FormButton
                title="Signup Here"
                modeValue='text'
                colorValue={'white'}
                uppercase={true}
                onPress={() => props.navigation.navigate("SignUp")}
                />
              </Card>
              ) : (
                <>
              <FormButton title={'login'} modeValue={'contained'} colorValue={"white"} onPress={() => setDispCard(true)}/>
              <FormButton title={'create an account'} modeValue={'outlined'} colorValue={"white"} onPress={() => props.navigation.navigate("SignUp")}/>
                  </>
              )
            }
          </View>
          </ScrollView>
        </SafeAreaView>
      </View>
           {/* </KeyboardAvoidingView> */}
       </KeyboardAwareScrollView>
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
})
