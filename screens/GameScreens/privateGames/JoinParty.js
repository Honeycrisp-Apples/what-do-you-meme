import React, {useState} from 'react'
import {FormButton, FormInput} from '../../../components/Reusables'
import {SafeAreaView, View, Text, Image, StyleSheet} from 'react-native';
import firebase from 'firebase'
import Fire from "../../../constants/Fire"

export function JoinParty(props){
 const [code, setCode] = useState("")

  const findRoom = async (roomCode) => {
    console.log("Entered RoomCode:", roomCode)
    let response
    await firebase
      .firestore()
      .collection('partyGames')
      .where( "partyID", '==', roomCode)
      .get()
      .then(function(querySnapshot) {
        if (querySnapshot.empty) {
          console.log("QueryData:",querySnapshot.docs)
          console.log("No such party!");
          response = false
        } else {
          console.log("QueryData:", querySnapshot.docs);
          response =  querySnapshot.docs[0]
        }
      })
    return response
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
          async () => {
            //logic to find room
            console.log("Code: ", code)
            const room = await findRoom(code)
            if(room){
              //logic to navigate to party lobby, params: gameID : room.ref.id
              console.log("Room:", room)
              const theUser = await firebase.firestore().collection('users').doc(`${Fire.shared.getUID()}`).get()
              const newUser = await { userId: Fire.shared.getUID(), wins: 0, wonMemes: [],
                displayName: theUser.data().displayName, imageURL: theUser.data().imageURL, points: theUser.data().points
              };
              await room.ref.update({
                users: firebase.firestore.FieldValue.arrayUnion(newUser),
                numUsers: room.data().numUsers + 1
              })
              props.navigation.navigate("PartyLobby", {gameID: room.ref.id})
            } else {
              alert("Room Does not exist. Try again...")
            }
          }
        }/>
      </SafeAreaView>
    </View>
  )
}
