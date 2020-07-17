import React, {useState} from 'react'
import {FormButton, FormInput} from '../components/Reusables'
import {SafeAreaView, View, Text, Image, StyleSheet} from 'react-native';
import firebase from 'firebase'

export function JoinParty(props){
 const [code, setCode] = useState("")
  const findRoom = async (roomCode) => {
    await firebase
      .firestore()
      .collection('game')
      .where( "partyCode", '==', roomCode)
      .get()
      .then(function(querySnapshot) {
        if (querySnapshot.empty) {
          console.log("No such party!");
          return false
        } else {
          console.log(querySnapshot.data());
          return querySnapshot
        }
      })
  }
  return(
    <View>
      <SafeAreaView>
        <Text>Enter the Room Code Here!</Text>
        <FormInput
        labelName={'ROOM CODE'}
        value={code}
        onChangeText={(codeValue)=> setCode(codeValue)}
        />
        <FormButton title={"Find Room"} onPress={
          () => {
            //logic to find room
            const room = findRoom(code)
            if(room){
              //logic to navigate to party lobby, params: gameID : room.ref.id
              alert("Functionality not there yet...")
            } else {
              alert("Room Does not exist. Try again...")
            }
          }
        }/>
      </SafeAreaView>
    </View>
  )
}
