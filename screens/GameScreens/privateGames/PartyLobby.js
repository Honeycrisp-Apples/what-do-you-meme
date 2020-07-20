
import { SafeAreaView, View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import Fire from '../../../constants/Fire';
import { FormButton } from '../../../components/Reusables';
import * as firebase from 'firebase';
import { useCollection, useDocument, useDocumentOnce } from 'react-firebase-hooks/firestore';
import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import {IconButton} from 'react-native-paper'

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
      <View style={{backgroundColor: 'purple',flex: 1}}>
        <ImageBackground style={styles.image}
          source={{uri: "https://images.pexels.com/photos/936048/pexels-photo-936048.jpeg?cs=srgb&dl=five-women-laughing-936048.jpg&fm=jpg://tedideas.files.wordpress.com/2015/03/science_of_laughter_sophie_scott_ted.jpg?w=1200"}}
          imageStyle={{opacity:0.3}}>
      <SafeAreaView style={{ flex: 1}}>
        {/* {
          (hostID === Fire.shared.getUID()) ? (
              <IconButton
							style={{
								marginLeft: 'auto',
								// position: 'absolute',
								// top: 10,
								// right: 10,
								// zIndex: 1
							}}
							icon="close-circle"
							size={36}
							color="white"
							onPress={async() => {
                props.navigation.goBack().then(()=>firebase.firestore().collection('partyGames').doc(`${props.route.params.gameID}`).delete())
              }}
						/>
          ) : null

        } */}
        {/* <Text style={{ color: 'white' }}>
        { value && value.data() && `Number of Players: ${value.data().numUsers}`}
        </Text> */}
        <Text style={{ fontSize: 50, color: 'white', textAlign: 'center', fontFamily: "FredokaOne_400Regular", }}>
          Party Lobby!
        </Text>
        <View style={{backgroundColor: 'white', padding: 10, marginVertical: 10}}>
          <Text style={{ fontSize: 30, color: 'purple', textAlign: 'center', fontFamily: "FredokaOne_400Regular", }}>
            Room Code: {partyID}
          </Text>
          <Text style={{ fontSize: 20, color: 'purple', textAlign: 'center', fontFamily: "FredokaOne_400Regular", }}>
            Give your friends this code to join!
          </Text>
        </View>

        <Text style={{ fontSize: 20, color: 'white', textAlign: 'center', fontFamily: "FredokaOne_400Regular", }}>
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
                <View style={{ marginLeft: 20, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 20 }}>{user.displayName}</Text>
                  <Text style={{ fontSize: 10, color: 'purple' }}>MEMER POINTS: {user.points}</Text>
                </View>
              </View>
            )
          })
        }
        <View style={{marginTop: 'auto', marginBottom: 20}}>
        {
          (value && value.data() && value.data().numUsers > 2 && (Fire.shared.getUID() === hostID)) ? (
            <FormButton title={'start game'} colorValue={"rgb(0,122,255)"} modeValue={'contained'} onPress={() => startGame()}/>
          ) : (
          // <Text style={{ fontSize: 30, color: 'white', textAlign: 'center', fontFamily: "FredokaOne_400Regular", }}>Waiting for Memers....</Text>
          null
          )
        }
        </View>
      </SafeAreaView>
      </ImageBackground>
      </View>
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
    borderColor: 'purple',
    width: 50,
    height: 50,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    // backgroundColor: "rgba(255,0,0,0.3)"
    // opacity: 0.7
  },
});
