import React, { useState } from 'react';
import { SafeAreaView, Text, Button, View, ScrollView, Dimensions, StyleSheet, Image, ImageBackground, Alert, TouchableHighlight, TouchableOpacity } from 'react-native';
import Fire from '../constants/Fire';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
// import functions from 'firebase-functions';
import { Card } from 'react-native-paper';
import Carousel from 'react-native-snap-carousel';
import {FormButton} from '../components/Reusables'
// import { TouchableOpacity } from 'react-native-gesture-handler';
import {LoadingMemer} from './LoadingMemer'
import {CustomAlert} from './CustomAlerts'

import axios from 'axios'
// type Props = {
//   navigation: { navigate: (arg0: string) => void, state: {params: {username? : string}} },
//   username?: string
// }
// interface AState {
//   user: any,
//   ready: boolean
// }
const { width, height } = Dimensions.get('window');
const height2 = width * 0.8;

export default function Welcome(props) {
  const [master, setMaster] = useState(false)
  const [notYet, setNotYet] = useState(false)
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

  const data = [
    { title: "Best Caption", link: "GameLobby", image:"https://tedideas.files.wordpress.com/2015/03/science_of_laughter_sophie_scott_ted.jpg?w=1200"},
    { title: "Ultimate Memer", link: "masterOpen", image:"https://vignette.wikia.nocookie.net/starwars/images/d/d6/Yoda_SWSB.png/revision/latest?cb=20150206140125"},
    { title: "More Game Modes Coming Soon", link: "notYetOpen", image:"https://images.unsplash.com/photo-1505744768106-34d8c47a1327?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80://tedideas.files.wordpress.com/2015/03/science_of_laughter_sophie_scott_ted.jpg?w=1200"}
  ]

  const _renderItem = ({item, index}) => {
    return (
        // <View style={styles.slide}>
        //     <Text style={styles.title}>{ item.title }</Text>
        // </View>
        <Card style={styles.card}
         onPress={()=> {
           if(item.link === "GameLobby") return addUserToGame()
          //  else {return Alert.alert("Not A Master Memer!","You must earn more memes to unlock!")}
          else if(item.link === 'masterOpen') return setMaster("flex")
          else if (item.link === "notYetOpen") return setNotYet("flex")
         }
        }
        >
          <ImageBackground
          style={styles.image} source={{uri: item.image}}
          imageStyle={{opacity:0.5, borderRadius: 3}}
          >
          <Text style={{fontSize: 30, textAlign: 'center' , color: 'white', fontFamily: 'FredokaOne_400Regular'}}>{((item.title)|| "Hi there").toUpperCase()}</Text>
          </ImageBackground>
        </Card>
    );
  }


  const getout = () => {
    Fire.shared.logout();
    // props.navigation.navigate('Login');
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
  //   firebase.firestore().collection('users').doc(`${Fire.shared.getUID()}`),
  //   {
  //     snapshotListenOptions: { includeMetadataChanges: true },
  //   }
  // );

  const goToGame = (thing, thingID) => {
    props.navigation.navigate('GameLobby', {gameID: thingID});
  };
  const goToParty = (thing, thingID) => {
    props.navigation.navigate("PartyLobby", {gameID: thingID})
  }

  const makeParty = async () => {
    const theUser = await firebase.firestore().collection('users').doc(`${Fire.shared.getUID()}`).get()
    const newUser = await { userId: Fire.shared.getUID(), wins: 0, wonMemes: [],
      displayName: theUser.data().displayName, imageURL: theUser.data().imageURL, points: theUser.data().points
    };

    firebase
      .firestore()
      .collection('partyGames')
      .doc()
      .set(
        {
          users: [newUser],
          currentMeme: 'https://i.imgflip.com/1w7ygt.jpg',
          endMode: false,
          gameId: "",
          gameMode: 'regular',
          gotUsers: false,
          hostID: Fire.shared.getUID(),
          partyID: '',
          inputs:[],
          numUsers: 1,
          playing: false,
          winningMeme: '',
          roundMemes: [],
          timeStamp: Fire.shared.getTime(),
        },
        { merge: true }
      )
      .then(() => {
        firebase
          .firestore()
          .collection('partyGames')
          .orderBy('timeStamp', 'desc')
          .limit(1)
          .get()
          .then(async (query) => {
            let thing2 = query.docs[0];

            // await thing2.ref.update({
            //   gameId: thing2.ref.id,
            // });

            const shuffle = (arr) => arr.sort(() => 0.5 - Math.random());
            axios.get('https://api.imgflip.com/get_memes').then((memeData) => {
              let shuffledMemes = shuffle(memeData.data.data.memes);
              thing2.ref.update({
                gameId: thing2.ref.id,
                roundMemes: [shuffledMemes[0].url,shuffledMemes[1].url,shuffledMemes[2].url],
                winningMeme: shuffledMemes[3].url,
                partyID: thing2.ref.id.split("").slice(0,4).join('')
              }).catch((error) => console.log(error));});
            return thing2;
            // goToGame(thing2);
          })
          .then((thing2) => {
            //pass the game id as well
            goToParty(thing2, thing2.ref.id);
            console.log('thing2', thing2);
          });
      });
  }
  //visit game Id later
  const makeNewGame = (newUser, newInput) => {
    firebase
      .firestore()
      .collection('game')
      .doc()
      .set(
        {
          users: [newUser],
          currentMeme: 'https://i.imgflip.com/1w7ygt.jpg',
          endMode: false,
          gameId: "",
          gameMode: 'regular',
          gotUsers: false,
          // inputs: [newInput],
          inputs:[],
          numUsers: 1,
          playing: false,
          winningMeme: '',
          roundMemes: [],
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

            // await thing2.ref.update({
            //   gameId: thing2.ref.id,
            // });

            const shuffle = (arr) => arr.sort(() => 0.5 - Math.random());
            axios.get('https://api.imgflip.com/get_memes').then((memeData) => {
              let shuffledMemes = shuffle(memeData.data.data.memes);
              thing2.ref.update({
                gameId: thing2.ref.id,
                roundMemes: [shuffledMemes[0].url,shuffledMemes[1].url,shuffledMemes[2].url],
                winningMeme: shuffledMemes[3].url,
              }).catch((error) => console.log(error));});
            return thing2;
            // goToGame(thing2);
          })
          .then((thing2) => {
            //pass the game id as well
            goToGame(thing2, thing2.ref.id);
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
      .then(async (query) => {
        const theUser = await firebase.firestore().collection('users').doc(`${Fire.shared.getUID()}`).get()
        // const theUser = userData ? userData : 'nope'
        if(!theUser.data().inGame){
          await theUser.ref.update({
            inGame: true
          })
          console.log("theUser:", theUser)
          console.log("theUserData:", theUser.data())
          const newUser = await { userId: Fire.shared.getUID(), wins: 0, wonMemes: [],
            displayName: theUser.data().displayName, imageURL: theUser.data().imageURL, points: theUser.data().points
          };
          const newInput = { caption: '', userId: Fire.shared.getUID(), vote: 0 };
          if (query.docs.length) {
            const thing = query.docs[0];
            console.log('query', query.docs);
            let curVal = thing.data().numUsers;
            // let curUsers = thing.data().users;
            // let curInputs = thing.data().inputs;
            const numOfPlayers = curVal + 1;
            await thing.ref.update({
              numUsers: numOfPlayers,
              users: firebase.firestore.FieldValue.arrayUnion(newUser),
            });
              // (!theUser.data().inGame) ?
              // (
              // curUsers && thing.ref.update({
              // numUsers: numOfPlayers, users: [...curUsers, newUser],
              // })
              // ): (alert("Ooops, you've already joined a game!"))

            // also pass the game id

            goToGame(thing, thing.ref.id);

          } else {
            makeNewGame(newUser, newInput);
          }
        }
      })
      .catch((err) => {
        return console.log(err, "Couldn't find it");
      });

    // goToGame();
  };

  // render(){
  const [user, loading, error] = useAuthState(firebase.auth());
  const [userData, userL, userE] = useDocument(firebase.firestore().collection('users').doc(`${Fire.shared.getUID()}`))

  if (loading) {
    // return <Text>I'm loading</Text>;
    return <LoadingMemer/>
  }
  if (error) {
    return <Text>You Messed Up!!</Text>;
  }
  if (user && userData) {
    console.log("userData:", userData.data())
    return (
      <View style={styles.welcome}>
      <SafeAreaView style={styles.welcome}>
        <TouchableOpacity style={styles.mainUser}
        onPress={() => props.navigation.navigate('UserPages')}
        >
         {/* needs user object in database image url and points */}

              <Image
              style={styles.userimg}
              source={{uri: `${userData.data().imageURL}`}}
              />

              {user && user.displayName &&
              <Text style={{fontSize: 20, marginLeft: 5}}>{user.displayName.toUpperCase()}</Text>
              }

              <Text style={{fontSize: 15, marginLeft: 'auto', marginRight: 10,}}>MEMER POINTS: {`${userData.data().points}`}</Text>

        </TouchableOpacity>

        {/* <Text>{`Hello there, ${user.displayName}`}</Text> */}
        {/* <View
          style={styles.scrollContainer}
        >
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            <Card style={styles.card}>
              <Text>Hi there</Text>
            </Card>
            <Card style={styles.card}>
              <Text>Hi there</Text>
            </Card>
            <Card style={styles.card}>
              <Text>Hi there</Text>
            </Card>
          </ScrollView>
        </View> */}
        <View style={{marginBottom: 20}}>

        <Carousel
        layout={'default'}
              // ref={(c) => { this._carousel = c; }}
              data={data}
              renderItem={_renderItem}
              sliderWidth={width}
              itemWidth={width - 100}
        />
        </View>
        <View style={{marginTop: 'auto', marginBottom: 20}}>

        <FormButton title={'create a room'} colorValue={"purple"} modeValue={'contained'} onPress={() => makeParty()}/>
        <FormButton title={'join a room'} colorValue={"blue"} modeValue={'contained'} onPress={() => props.navigation.navigate("JoinParty")}/>
        <FormButton  title={'logout'} colorValue={"white"} modeValue={'contained'} onPress={() => getout()}/>
        <FormButton  title={'temp'} colorValue={"yellow"} modeValue={'contained'} onPress={() => props.navigation.navigate("GameLobby", {gameID: "e7Xp0HYrHEIxKBLOXYr8"})}/>
        </View>
        {/* <Button title={'Join Game'} onPress={() => addUserToGame()}></Button> */}
        {/* <Button title={'LOGOUT'} onPress={() => getout()}></Button> */}
        {/* <Button
          title={'To User'}
          onPress={() => props.navigation.navigate('UserPages')}
        ></Button>
        <Button title={'To Game'} onPress={() => addUserToGame()}></Button>

        ></Button> */}
        {/* <Button
          title={'To Game'}
          onPress={() => props.navigation.navigate('GameLobby')}
        ></Button> */}
        {
          master ? (
            <TouchableOpacity
            style={{position: 'absolute',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: height,
            width: width}}
            onPress={()=> setMaster(false)}>
              <CustomAlert visible={master} title={"Not A Master Memer!"} message={"You have to play more games and earn more memes to unlock."}/>
            </TouchableOpacity>
          ): null
        }

        {
        notYet ? (
          <TouchableOpacity
            style={{position: 'absolute',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: height,
            width: width}}
            onPress={()=> setNotYet(false)}>
          <CustomAlert visible={notYet} title={"Coming Soon!"} message={"There's so many games that are coming your way!"}/>
          </TouchableOpacity>
        ): null
        }
      </SafeAreaView>
      </View>
    );
  }
  // return <Text>Umm... how?</Text>;
  return <LoadingMemer/>
  // }
}
const styles = StyleSheet.create({
  welcome:{
    flex: 1,
    backgroundColor: '#f1f1f1'

  },
  scrollContainer: {
    height: height2,
  },
  card: {
    backgroundColor: 'blue',
    width: width - 100,
    height: height2,
    // marginLeft: 25,
    // marginRight: 25
    // backgroundColor: 'blue',
    flexDirection: 'column',
    // justifyContent: 'center',
    alignItems: 'center',

  },
  mainUser:{
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  userimg:{
    borderRadius: 50/2,
    borderWidth: 3,
    borderColor: 'blue',
    width: 50,
    height:50
  },
  image: {
    borderRadius: 5,
    width: width - 100,
    height: height2,
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    // backgroundColor: "rgba(255,0,0,0.3)"
    // opacity: 0.7
  },
});
