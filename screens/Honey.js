import React, {useState, useEffect} from 'react'
import {View, SafeAreaView, Text, StyleSheet} from 'react-native'


export function Honey (props){

  useEffect(()=> {
    setTimeout(()=> props.navigation.navigate("Intro"), 5000)
  }, [])

  return(
    <View style={styles.main}>
      <SafeAreaView style={styles.safe}>
        <Text style={styles.text}>HONEY</Text>
        <Text style={styles.text}>CRISP</Text>
        <Text style={styles.text}>GAMES</Text>
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
