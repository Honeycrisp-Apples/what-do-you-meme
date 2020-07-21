import React, {useState, useEffect, useRef} from 'react'
import {View, SafeAreaView, Text, StyleSheet, Image, Animated} from 'react-native'


export function Honey (props){
  // const fade1 = useState(new Animated.Value(0))[0]
  // const fade2 = useState(new Animated.Value(0))[0]
  // const fade3 = useState(new Animated.Value(0))[0]
  const [one, setOne] = useState('none')
  const [two, setTwo] = useState('none')
  const [three, setThree] = useState('none')
  const [four, setFour] = useState('none')

  useEffect(()=> {
  //   Animated.timing(
  //     fade1,
  //     {
  //       toValue: 1,
  //       duration: 500,
  //       useNativeDriver: true
  //     }
  //   ).start();

  //   Animated.timing(
  //     fade2,
  //     {
  //       toValue: 1,
  //       duration: 1000,
  //       useNativeDriver: true
  //     }
  //   ).start();

  //   Animated.timing(
  //     fade3,
  //     {
  //       toValue: 1,
  //       duration: 1500,
  //       useNativeDriver: true
  //     }
  //   ).start();
    setTimeout(()=> setOne('flex'), 500)
    setTimeout(()=> setTwo('flex'), 1000)
    setTimeout(()=> setThree('flex'), 1500)
    setTimeout(()=> setFour('flex'), 2000)
    setTimeout(()=> props.navigation.navigate("Intro"), 5000)
  }, [])

  return(
    <View style={styles.main}>
      <SafeAreaView style={styles.safe}>
        <Image
          source={require('../assets/images/logo_fill.png')}
          style={
            {
              height: 100,
              width: 100,
              alignSelf: 'center',
              display: four
            }
          }
        />
        <Text style={[styles.text, {display: one}]}>HONEY</Text>
        <Text style={[styles.text, {display: two}]}>CRISP</Text>
        <Text style={[styles.text, {display: three}]}>GAMES</Text>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: 'black',
    flex: 1
  },
  safe: {
    marginTop: 'auto'
  },
  text: {
    fontFamily: 'FredokaOne_400Regular',
    fontSize: 100,
    color: 'white',
    textAlign: 'center'
  }

})
