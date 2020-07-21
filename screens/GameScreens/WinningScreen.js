import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, Button, TouchableOpacity, Dimensions } from 'react-native';
import Fire from '../../constants/Fire';
import { FormButton } from '../../components/Reusables';
import {IconButton} from 'react-native-paper'
import * as firebase from 'firebase';

import  { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import SendFriendRequests from '../../utilities/SendFriendRequest';
import {CustomAlert} from '../CustomAlerts'
export default function WinningScreen (props) {
  // constructor(props){
  //   super(props)
  //   this.state = {
  //     winningUser: {},
  //     players: []
  //   }
  // }

  const [friReq, setFriReq] = useState(false)
  const { width, height } = Dimensions.get('window');
  const navigation = useNavigation();
  const [winningUser, setWinUser] = useState({})
  const [players, setPlayers] = useState([])
  const [wonMeme, setWonMeme] = useState('')
  useEffect(() =>{
    const callMe = async function (){
      let gameDoc = await firebase.firestore().collection(`${props.gameType}`).doc(`${props.GID}`).get()
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
      <View style={{flex: 1, backgroundColor: 'rgb(0, 122, 255)'}}>
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
        <Text style={{fontFamily: 'FredokaOne_400Regular' ,fontSize: 50, color: 'white', textAlign: 'center'}}>WINNER!!!</Text>
        <View style={{backgroundColor: 'orange', height: 200, width: 200, borderRadius: 100, alignSelf: 'center', justifyContent: "center", alignItems: "center" }}>
          {
            (winner && winner.imageURL && winner.displayName)?(
              <>
            <Image
            style={{
              margin: 5,
              borderRadius: 100/2,
              borderWidth: 3,
              borderColor: 'blue',
              width: 100,
              height:100}}
            source={{uri: winner.imageURL}}
            />
            <View style={{ marginTop: 5, height: 30, paddingHorizontal: 5, borderRadius: 5, backgroundColor: 'white', justifyContent: 'center'}}>
            <Text style={{color: 'blue', fontSize: 20}}>{winner.displayName || "HI"}</Text>
            </View>
            </>
            ): null
          }
          {
            (winner && (winner.userId !== Fire.shared.getUID())) ? (
              <IconButton
              icon="account-plus"
              size={20}
              color="white"
              onPress={async () => {
                let currentUser = await firebase.firestore().collection('users').doc(`${Fire.shared.getUID()}`).get()
                let user = await firebase.firestore().collection('users').doc(`${winner.userId}`).get()
                await SendFriendRequests(user, currentUser)

                setFriReq(true)
                // alert("Friend request sent!")
              }}
              />
            )
            : null
          }
        </View >
        <Text style={{marginTop: 20,fontFamily: 'FredokaOne_400Regular' , fontSize: 20, color: 'white', textAlign: 'center', marginBottom: 10}}>PRIZED MEME: </Text>
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
              style={{height: 100, width: 100, backgroundColor: "white", flexDirection: "row", alignItems: 'center', width: "100%", justifyContent: 'center'}}>
                <Image
                style={styles.img}
                source={{uri: `${player.imageURL}`}}
                />
                {
                  (player.userId !== Fire.shared.getUID())?
                  (<IconButton
                      icon="account-plus"
                      size={20}
                      color="blue"
                      onPress={async () => {
                        let currentUser = await firebase.firestore().collection('users').doc(`${Fire.shared.getUID()}`).get()
                        let user = await firebase.firestore().collection('users').doc(`${player.userId}`).get()
                        await SendFriendRequests(user, currentUser)
                        setFriReq(true)
                        // alert("Friend request sent!")
                      }}
                      />) : null
                }
                <Text style={{fontSize: 20, color: 'blue'}}>{player.displayName}</Text>
              </View>
            )
          })
          ): null
        }

      </View>
        {/* <FormButton title={'game lobby'} style={{marginTop: 'auto'}} colorValue={'white'} modeValue={'contained'} onPress={()=> this.props.navigation.navigate("GameLobby")}/> */}
      </SafeAreaView>
      {
          friReq ? (
            <TouchableOpacity
            style={{position: 'absolute',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: height,
            width: width}}
            onPress={()=> setFriReq(false)}>
              <CustomAlert visible={true} title={"Friend Request Sent!"} message={"Look at you being all social!"}/>
            </TouchableOpacity>
          ): null
        }
      </View>
    )
  }
// }

const styles = StyleSheet.create({
  winResults:{
    flex: 1,
    // backgroundColor: 'blue'
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
    borderColor: 'blue',
    width: 70,
    height:70
  },
  players:{
    marginTop: 10,
    // flexDirection: 'row',
    justifyContent: 'center'
  },
});
