import React, {useEffect, useState} from "react"
import { View, StyleSheet, Text } from "react-native"
import { SafeAreaView } from "react-navigation"

export function LoadingMemer (props){
  const [bg, setBG] = useState('blue')

  let randomHex = () => {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  let myInt;

  useEffect(()=>{
    myInt = setInterval(()=> {
      let color = randomHex()
      setBG(color)
    }, 1000)
    return () => clearInterval(myInt)
  }, [])

  return(
    <View style={{flex: 1, backgroundColor: bg}}>
      <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <Text style={[styles.logo, {fontSize: 100}]}>MEMER</Text>
        <Text style={[styles.logo, {fontSize: 30}]}>MAKE ME LAUGH</Text>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  logo: {
    fontFamily: "FredokaOne_400Regular",
    color: 'white',
    textAlign: 'center'
  }
})
