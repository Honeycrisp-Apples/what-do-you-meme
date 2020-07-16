import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet } from 'react-native';
import Fire from '../../constants/Fire';
import { FormButton } from '../../components/Reusables';
import {IconButton} from 'react-native-paper'
import * as firebase from 'firebase';

import  { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

export default function WinningScreen (props) {
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     winningUser: {},
  //     players: []
  //   }
  // }
  const navigation = useNavigation();
  const [winningUser, setWinUser] = useState({})
  const [players, setPlayers] = useState([])
  const [wonMeme, setWonMeme] = useState('')
  useEffect(() =>{
    const callMe = async function (){
      let gameDoc = await firebase.firestore().collection('game').doc(`${props.GID}`).get()
      setWonMeme(gameDoc.data().winningMeme)
      let theWinner = await gameDoc.data().users.reduce((acc, curUser, index)=>{
        if(index === 0) { console.log("first index"); acc = curUser}
        else if(curUser.wins > acc.wins) { console.log("comparing indexes"); acc = curUser}
        console.log("acc: ", acc)
        return acc
      },{})
      let theRest = await gameDoc.data().users.filter((curUser)=> {
        return curUser.userId !== theWinner.userId
      })
      await firebase.firestore().collection('users').doc(`${Fire.shared.getUID()}`).update({inGame: false})
      setWinUser(theWinner)
      setPlayers(theRest)
    }
    callMe()
  }, [])
  // async componentDidMount(){
  //   // let gameDoc = await firebase.firestore().collection('game').doc(`${this.props.route.params.gameID}`).get()
  //   let gameDoc = await firebase.firestore().collection('game').doc(`${this.props.GID}`).get()
  //   let theWinner = await gameDoc.data().users.reduce((acc, curUser, index)=>{
  //     if(index === 0) { console.log("first index"); acc = curUser}
  //     else if(curUser.wins > acc.wins) { console.log("comparing indexes"); acc = curUser}
  //     console.log("acc: ", acc)
  //     return acc
  //   },{})
  //   let theRest = await gameDoc.data().users.filter((curUser)=> {
  //     return curUser.userId !== theWinner.userId
  //   })
  //   this.setState({
  //     winningUser: theWinner,
  //     players: theRest
  //   })
  //   //delete the game
  //   // await firebase.firestore().collection('game').doc(`${this.props.route.params.gameID}`).delete()
  // }
  // render() {

  const handleRewards = async() =>{
    if(winningUser){
      let userDoc = await firebase.firestore().collection('users').doc(`${winningUser.userId}`).get()
          console.log("Setting up user stuff", userDoc.data(),winningUser.userId )
          await userDoc.ref.update({
            points: userDoc.data().points+100,
            earnedMemes: firebase.firestore.FieldValue.arrayUnion(wonMeme)
          })
    }
  }
    const winner = winningUser
    const losers = players
    const theMeme = wonMeme
    // if(!navigation.isFocused){
    //   if(winningUser && Fire.shared.getUID() === winningUser.userId){
    //     handleRewards()
    //   }
    // }
    return(
      <SafeAreaView style={styles.winResults}>
       {
       (winner && winner.userId) ? (
       <IconButton
              style={{
                marginLeft: 'auto',
                position: 'absolute',
                top: 10,
                right: 0,
                zIndex: 1,
              }}
              icon="close-circle"
              size={36}
              color="orange"
              onPress={() => {
                if(winner && Fire.shared.getUID() === winner.userId){
                  handleRewards()
                }
                navigation ? navigation.navigate("Welcome") : alert("nope")
              }}
            />
       ): null
          }
        <Text style={{fontSize: 50, color: 'white', textAlign: 'center'}}>WINNER!!!</Text>
        <View style={{backgroundColor: 'orange', height: 200, width: 200, borderRadius: 100, alignSelf: 'center', justifyContent: "center", alignItems: "center" }}>
          {
            (winner && winner.imageURL && winner.displayName)?(
              <>
            <Image
            style={styles.img}
            source={{uri: winner.imageURL}}
            />
            <Text style={{color: 'white'}}>{winner.displayName || "HI"}</Text>
            </>
            ): null
          }
        </View>
        <Text style={{fontSize: 20, color: 'white', textAlign: 'center', marginBottom: 10}}>PRIZED MEME: </Text>
        <View style={{alignItems: 'center', width: 300, alignSelf:'center'}}>
          {
            (theMeme && theMeme.length) ? (
              <Image
              style={styles.memeimg}
              source={{uri: theMeme}}
              />
            )
            : null
          }
        </View>
        <View style={styles.players}>
        {
          (losers && losers.length)?
          (
          losers.map((player)=>{
            return(
              <View key={player.userId}
              style={{height: 140, width: 140, backgroundColor: "darkred", alignItems: 'center', borderRadius: 70, justifyContent: 'center'}}>
                <Image
                style={styles.img}
                source={{uri: `${player.imageURL}`}}
                />
                <IconButton
                icon="account-plus"
                size={20}
                color="white"
                onPress={() => alert("Functionaility not available yet.")}
                />
              </View>
            )
          })
          ): null
        }
      </View>
        {/* <FormButton title={'game lobby'} style={{marginTop: 'auto'}} colorValue={'white'} modeValue={'contained'} onPress={()=> this.props.navigation.navigate("GameLobby")}/> */}
      </SafeAreaView>
    )
  }
// }

const styles = StyleSheet.create({
  winResults:{
    flex: 1,
    backgroundColor: 'gold'
  },
  memeimg:{
    width: 200,
    height: 200,
    borderWidth: 3,
    borderColor: 'orange',
  },
  img:{
    margin: 5,
    borderRadius: 100/2,
    borderWidth: 3,
    borderColor: 'darkred',
    width: 70,
    height:70
  },
  players:{
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center'
  },
});
