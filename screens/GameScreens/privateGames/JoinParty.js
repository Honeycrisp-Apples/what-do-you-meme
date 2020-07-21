import React, {useState} from 'react'
import {FormButton, FormInput} from '../../../components/Reusables'
import {SafeAreaView, View, Text, Image, StyleSheet} from 'react-native';
import firebase from 'firebase'
import Fire from "../../../constants/Fire"
import {IconButton} from 'react-native-paper'
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
    <View style={{flex: 1, backgroundColor: '#694fad', justifyContent: 'center' }}>
      <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <IconButton
							style={{
								marginLeft: 'auto',
								position: 'absolute',
								top: 10,
								right: 10,
								zIndex: 1
							}}
							icon="close-circle"
							size={36}
							color="white"
							onPress={() => props.navigation.goBack()}
						/>
        <Text style={{color: 'white', fontFamily: 'FredokaOne_400Regular', textAlign: 'center', fontSize: 40, marginHorizontal: 24}}>Enter the Room Code Here!</Text>
        <FormInput
        labelName={'ROOM CODE'}
        value={code}
        onChangeText={(codeValue)=> setCode(codeValue)}
        />
        <FormButton title={"Find Room"} colorValue={'white'} modeValue={"contained"} onPress={
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
