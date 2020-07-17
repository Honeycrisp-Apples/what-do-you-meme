
import { SafeAreaView, View, Text, Image, StyleSheet } from 'react-native';
import Fire from '../../../constants/Fire';
import { FormButton } from '../../../components/Reusables';
import * as firebase from 'firebase';
import { useCollection, useDocument, useDocumentOnce } from 'react-firebase-hooks/firestore';
import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'


export function PartyLobby (props){

  const [value, loading, error] = useDocument(
    firebase.firestore().collection('partyGames').doc(`${props.route.params.gameID}`)
  );



  const startGame = async () => {
    console.log("Hit me!!!!!!")
      await firebase.firestore().collection('partyGames').doc(`${props.route.params.gameID}`)
      .update({
        playing: true
      })
  }

  if(value && value.data() && value.data().playing){
    setTimeout(()=>{
      props.navigation.navigate("GameComp", {gameID: props.route.params.gameID, whichGame: 'partyGames'})
    }, 5000)
  }

  if (error) {
    return <Text>Error: {JSON.stringify(error)}</Text>;
  } else if (loading) {
    return <Text>Collection: Loading...</Text>;
  } else if (value) {
    console.log('value', value.data());
    // const partyID = value.ref.id.split("").slice(0,4).join('')
    const hostID = value.data().hostID
    const partyID = value.data().partyID
    console.log("Code:", partyID, "Host: ", hostID)
    return (
      <SafeAreaView style={{backgroundColor: 'purple', flex: 1}}>
        <Text style={{ color: 'white' }}>
        { value && value.data() && `Number of Players: ${value.data().numUsers}`}
        </Text>
        <Text style={{ fontSize: 50, color: 'white', textAlign: 'center' }}>
          Party Lobby!
        </Text>
        <Text style={{ fontSize: 50, color: 'white', textAlign: 'center' }}>
          Room Code: {partyID}
        </Text>
        <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>
          Tell your friends to enter in this code to join!
        </Text>
        <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>
          {
          value && value.data() &&
          value.data().playing ? "Starting Game!" : "Waiting for Memers..."
          }
        </Text>
        {
          value && value.data() && value.data().users && value.data().users.length &&
          value.data().users.map((user)=> {
            return (
              <View key={user.userId} style={styles.user}>
                <Image
                  style={styles.userimg}
                  source={{
                    uri: `${user.imageURL}`
                  }}
                />
                <View style={{ marginLeft: 5 }}>
                  <Text style={{ fontSize: 20 }}>{user.displayName}</Text>
                  <Text style={{ fontSize: 10 }}>MEMER POINTS: {user.points}</Text>
                </View>
              </View>
            )
          })
        }
        {
          (value && value.data() && value.data().numUsers > 2 && (Fire.shared.getUID() === hostID)) ? (
            <FormButton title={'start game'} colorValue={"orange"} modeValue={'contained'} onPress={() => startGame()}/>
          ) : (<Text style={{ fontSize: 30, color: 'white', textAlign: 'center' }}>Waiting for Users....</Text>)
        }
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  lobby: {
    flex: 1,
    backgroundColor: 'blue',
  },
  user: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  userimg: {
    borderRadius: 50 / 2,
    borderWidth: 3,
    borderColor: 'darkred',
    width: 50,
    height: 50,
  },
});
