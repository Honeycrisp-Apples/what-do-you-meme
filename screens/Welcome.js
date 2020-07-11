import React from 'react';

import { SafeAreaView, Text, Button } from 'react-native';
import Fire from '../constants/Fire';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
// import functions from 'firebase-functions';

// type Props = {
//   navigation: { navigate: (arg0: string) => void, state: {params: {username? : string}} },
//   username?: string
// }
// interface AState {
//   user: any,
//   ready: boolean
// }

export default function Welcome(props) {
  // state = {
  //   // user: this.props.navigation.state.params.username
  //   user: Fire.shared.getUser(),
  //   ready: false
  // }
  // componentDidMount(){
  //   this.setState({
  //     user: Fire.shared.getUser()
  //   })
  // }
  // componentWillUpdate(){
  //   this.setState({ready:true})
  // }
  const getout = () => {
    Fire.shared.logout();
    props.navigation.navigate('Login');
    // this.props.navigation.navigate("TabOneNavigator")
    // console.log(this.state.user)
    console.log('logged out. Did navigation happen?');
  };

  // const [game, gameLoading, gameError] = useDocument(
  //   firebase.firestore().collection('game').doc('PReC4ht5CcZFvI3cYEnP'),
  //   {
  //     snapshotListenOptions: { includeMetadataChanges: true },
  //   }
  // );

  // const [userData, userLoading, userError] = useDocument(
  //   firebase.firestore().collection('users').doc(`${Fire.shared.getUID()}`)
  // );

  const goToGame = (thing) => {
    props.navigation.navigate('GameLobby', { theGame: thing });
  };

  // console.log('game', game.data());

  //visit game Id later
  const makeNewGame = (newUser, newInput) => {
    firebase
      .firestore()
      .collection('game')
      .doc()
      .set(
        {
          users: [newUser],
          currentMeme: '',
          endMode: false,
          gameId: '',
          gameMode: 'regular',
          gotUsers: false,
          inputs: [newInput],
          numUsers: 1,
          playing: false,
          winningMeme: '',
          timeStamp: Fire.shared.getTime(),
        },
        { merge: true }
      )
      .then(() => {
        firebase
          .firestore()
          .collection('game')
          .orderBy('timeStamp', 'desc')
          .limit(1)
          .get()
          .then(async (query) => {
            let thing2 = query.docs[0];
            await thing2.ref.update({
              gameId: thing2.ref.id,
            });
            return thing2;
            // goToGame(thing2);
          })
          .then((thing2) => {
            goToGame(thing2);
            console.log('thing2', thing2);
          });
      });
    // console.log('hit me');
    // const goPlease = functions.firestore
    //   .document('game/{gameId}')
    //   .onCreate((snap, context) => goToGame(snap));
    // goPlease();
    // console.log('thing2 docs', thing2.docs[0].data());
    // .then((thing2) => console.log('thing2', thing2));
    // console.log('thing2', thing2);
    // return thing2;
    // add a timestamp to each game object, query the database ordering by the timestamp for the last child
    // ref.orderByChild('timestamp').limitToLast(1).on('child_added',function(snapshot) {
    // console.log('new record', snapshot.val());
    // });
  };
  const addUserToGame = () => {
    firebase
      .firestore()
      .collection('game')
      .where('numUsers', '<', 3)
      .orderBy('numUsers')
      .limit(1)
      .get()
      .then((query) => {
        const newUser = { userId: Fire.shared.getUID(), wins: 0, wonMemes: [] };
        const newInput = { caption: '', userId: Fire.shared.getUID(), vote: 0 };
        if (query.docs.length) {
          const thing = query.docs[0];
          console.log('query', query.docs);
          let curVal = thing.data().numUsers;
          let curUsers = thing.data().users;
          let curInputs = thing.data().inputs;
          const numOfPlayers = curVal + 1;
          thing.ref.update({
            numUsers: numOfPlayers,
            users: [...curUsers, newUser],
            inputs: [...curInputs, newInput],
          });
          goToGame(thing);
        } else {
          makeNewGame(newUser, newInput);
        }
      })
      .catch((err) => {
        return console.log(err, "Couldn't find it");
      });

    // goToGame();
  };

  // render(){
  const [user, loading, error] = useAuthState(firebase.auth());
  if (loading) {
    return <Text>I'm loading</Text>;
  }
  if (error) {
    return <Text>You Messed Up!!</Text>;
  }
  if (user) {
    return (
      <SafeAreaView>
        <Text>{`Hello there, ${user.displayName}`}</Text>
        <Button title={'LOGOUT'} onPress={() => getout()}></Button>
        <Button
          title={'To User'}
          onPress={() => props.navigation.navigate('UserPages')}
        ></Button>
        <Button title={'To Game'} onPress={() => addUserToGame()}></Button>
      </SafeAreaView>
    );
  }
  return <Text>Umm... how?</Text>;
  // }
}
