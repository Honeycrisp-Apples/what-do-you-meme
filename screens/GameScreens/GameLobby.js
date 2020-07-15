import { SafeAreaView, View, Text, Image, StyleSheet } from 'react-native';
import Fire from '../../constants/Fire';
import { FormButton } from '../../components/Reusables';
import * as firebase from 'firebase';
import { useCollection, useDocument, useDocumentOnce } from 'react-firebase-hooks/firestore';
import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'

export default function GameLobby(props) {
  const { navigation, route, gameUsers, game } = props
  // getGames() {
  //   firebase.firestore.collection('games');
  // }
  //sorting can happen to pass appropriate game to the next page; certain boxes are dependent on user array on game object

  let [value, loading, error] = useDocument(
    firebase.firestore().collection('game').doc(`${props.route.params.gameID}`),
    // {
    //   snapshotListenOptions: { includeMetadataChanges: true },
    // }
  );
  // console.log("Route: ", navigation)
  if(!navigation.isFocused()) {return null}
  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener('focus', () => {
  //     // The screen is focused
  //     // Call any action
  //     console.log("Game Loby is in focus!")
  //   });
  //   // Return the function to unsubscribe from the event so it gets removed on unmount
  //   return () => { value = null; loading = null; error = null; console.log("GAME NULLS: ", value, loading, error);
  //   return unsubscribe()};
  // }, [props.navigation.navigate]);

  // const [error, setError] = React.useState(false)
  // const [loading, setLoading] = React.useState(true)
  // const [value, setValue] = React.useState()

  // useEffect(()=>{
  //   const unsubscribe = firebase
  //       .firestore()
  //       .collection('recipes')
  //       .doc(`${props.route.params.gameID}`)
  //       .onSnapshot(
  //         doc => {
  //           setLoading(false)
  //           setValue(doc)
  //         },
  //         err => {
  //           setError(err)
  //         }
  //       )
  //       console.log("Mounted?")
  //   return () => {console.log("Unmounted?"); return () => unsubscribe()}
  // },[])

  // const [value, loading, error] = useDocument(
  //   firebase.firestore().collection('users').doc(``)
  // );
  console.log('route params gameID:', route.params.gameID)
  // console.log('route params theGame.data():', route.params.theGame.data());
  console.log('navigation', route);
  console.log("gameUsers", gameUsers)
  // if (error) {
  //   return <Text>Error: {JSON.stringify(error)}</Text>;
  // } else if (loading) {
  //   return <Text>Collection: Loading...</Text>;
  // } else if (value) {
  //   console.log('value', value.data());

  // let unsubscribe  = firebase.firestore().collection('game').doc(`${route.params.gameID}`)
  // .onSnapshot({includeMetadataChanges: true}, async function(gameDoc){
  //   console.log("This is the gameDoc:", gameDoc)
  //   // return await gameDoc.ref.update({
  //   //   playing: true
  //   // })
  // })

  // useEffect(() => {
  //   return () => unsubscribe()
  // })

  const startGame = () => {
    // game.playing = true
    navigation.navigate("MemePresentation", {gameID: route.params.gameID})
  }
  // if(game && game.numUsers === 2){
    if(value && value.data() && value.data().numUsers === 3){
    // game.playing = true
    console.log("Hit me!!!!!!")
    const hi = async() => {

      await firebase.firestore().collection('game').doc(`${route.params.gameID}`)
      .update({
        playing: true
      })
      // unsubscribe = firebase.firestore().collection('game').doc(`${route.params.gameID}`)
      // .onSnapshot({includeMetadataChanges: true}, async function(gameDoc){
      //   console.log("This is the gameDoc:", gameDoc)
      //   // return await gameDoc.ref.update({
      //   //   playing: true
      //   // })
      // })
      // .get()
      // .then(async (gameDoc) => {
      //   return await gameDoc.ref.update({
      //     playing: true
      //   })
      // })
      // unsubscribe()
    }
    hi().then(()=> setTimeout(startGame, 5000))
    // setTimeout(startGame, 5000)

  }

  if (error) {
    return <Text>Error: {JSON.stringify(error)}</Text>;
  } else if (loading) {
    return <Text>Collection: Loading...</Text>;
  } else if (value) {
    console.log('value', value.data());
  return (
    <SafeAreaView style={styles.lobby}>
      <Text style={{ color: 'white' }}>
       {/* { game && `Number of Players: ${game.numUsers}`} */}
       { value && value.data() && `Number of Players: ${value.data().numUsers}`}
      </Text>
      <Text style={{ fontSize: 50, color: 'white', textAlign: 'center' }}>
        Game Lobby!
      </Text>
      <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>
        {/* {
        game &&
        game.playing ? "Starting Game!" : "Waiting for Memers..."
        } */}
        {
        value && value.data() &&
        value.data().playing ? "Starting Game!" : "Waiting for Memers..."
        }
      </Text>
      {/* this is where a map happens */}
      {
      //  gameUsers && gameUsers.length &&
      //   gameUsers.map((user)=> {
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
      {/* <FormButton
        title={'leave game'}
        style={{ marginTop: 'auto' }}
        colorValue={'white'}
        modeValue={'contained'}
        onPress={() => navigation.navigate('Welcome')}
      /> */}
      {/* <FormButton
        title={'next panel'}
        colorValue={'white'}
        modeValue={'contained'}
        onPress={() => navigation.navigate('MemePresentation')}
      /> */}
    </SafeAreaView>
  );
}
return <Text style={{fontSize: 50}}>Hello, GL</Text>
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

// const mapStateToProps = (state, ownProps) => {
//   console.log("Here's the state from redux: ", state)
//   let ID = ownProps.route.params.gameID
//   let games = state.firestore.data.game
//   let game = games ? games[ID] : null

//   return(
//     {
//       hello: 'hello',
//       game: game ? game : null,
//       gameUsers: game ? game.users : null
//     }
//   )
// }

// export default compose(
//   connect(mapStateToProps),
//   firestoreConnect((props) => [
//     { collection: 'game', doc: props.route.params.gameID}
//   ])
// )(GameLobby)
