import React from 'react'
import { SafeAreaView, View, Text, Image, StyleSheet, Keyboard, Dimensions} from 'react-native';
import Fire from '../../constants/Fire';
import {FormButton, FormInput, FormTextArea} from '../../components/Reusables'
import { ScrollView } from 'react-native-gesture-handler';
import Textarea from 'react-native-textarea';
import { Audio } from 'expo-av';
// const soundObject = new Audio.Sound();
import {
  Player,
  Recorder,
  MediaStates
} from '@react-native-community/audio-toolkit';

import * as firebase from 'firebase';
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'

import {updateGameInput} from '../../redux/game-redux'

import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import  { useState, useEffect } from 'react';

const { width, height } = Dimensions.get('screen');
class CaptionInput extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      count: 30, caption: '', show:"flex", player: "new Player('../../assets/audio/Tick-DeepFrozenApps-397275646.mp3')"
    }
    this.captionChange = this.captionChange.bind(this)
    // this.loadSound()
  }
  // async loadSound(){
  //   if(!(await soundObject.getStatusAsync()).isLoaded){
  //   console.log("hit me!")
  //   await soundObject.loadAsync(require('../../assets/audio/Tick-DeepFrozenApps-397275646.mp3'));
  //   await soundObject.playAsync();
  //   }
  // }
  // async playSound(){
  //   await soundObject.unloadAsync()
  //   await soundObject.loadAsync(require('../../assets/audio/Tick-DeepFrozenApps-397275646.mp3'));
  //   await soundObject.playAsync()
  // }


  captionChange(){
    this.setState({caption: ''})
  }
  async componentDidMount(){
    //this is somehow still going when we dismount.....
    let myvar1;

    const change = async () => {
      if(this.state.count>0){
        // await soundObject.replayAsync()
        // this.playSound()
        this.setState({count: this.state.count-1})
      }else {
        clearInterval(myvar1)
        Keyboard.dismiss()
        this.setState({show: 'none'})
        // await updateGameInput(this.props.route.params.gameID, Fire.shared.getUID(), this.state.caption)
        // await this.updateInput(this.props.route.params.gameID, Fire.shared.getUID(), this.state.caption )
        await this.updateInput(this.props.GID, Fire.shared.getUID(), this.state.caption )
        console.log('leaving to vote')
        // return this.props.navigation.navigate("VotingScreen", {gameID: this.props.route.params.gameID})
      }
    }
    myvar1 = setInterval(()=>change(), 1000)
  }
  async componentWillUnmount(){
    // await soundObject.unloadAsync()
    // await firebase.firestore().collection('game').doc(`${this.props.route.params.gameID}`).update({
    //   inputs: []
    // })
  }
  async updateInput(gameID, userID, caption){
    // let unsubscribe =
    // let gameDoc = await firebase.firestore().collection('game').doc(`${gameID}`).get()
    // let curInputs = gameDoc.data().inputs
    let myInput = {caption, userId: userID, vote: 0}
    // curInputs.forEach(async (input, ind)=>{
    //   //get rid of the old caption input value
    //   if(input.userId == userID){
    //     await curInputs.splice(ind, 1, myInput)
    //   }
    // })
    // console.log("curInputs after splice", curInputs)
    // make a new input caption value
    //update gameDoc inputs array
    if(myInput.caption){
      await firebase.firestore().collection('game').doc(`${gameID}`).update({
        inputs: firebase.firestore.FieldValue.arrayUnion(myInput)
      })
    }
    // await firebase.firestore().collection('game').doc(`${gameID}`).set({
    //     inputs: firebase.firestore.FieldValue.arrayUnion(myInput)
    //   })
    // await firebase.firestore().collection('game').doc(`${gameID}`)
    // .onSnapshot({includeMetadataChanges: true}, async function(gameDoc){

    // })
    // .get()
    // .then(async (query)=> {
    //   const gameDoc = query
    //   let curInputs = gameDoc.data().inputs
    //   curInputs.forEach((input, ind)=>{
    //     //get rid of the old caption input value
    //     if(input.userID === userID){
    //       curInputs.splice(ind, 1)
    //     }
    //   })
    //   console.log("curInputs after splice", curInputs)
    //   // make a new input caption value
    //   let newInput = {caption, userID, vote: 0}
    //   //update gameDoc inputs array
    //   return await gameDoc.ref.update({
    //     inputs: [...curInputs, newInput]
    //   })
    // })
    // unsubscribe()
  }
  //have a component will unmount to GameObj.unputs.push(this.state.caption) to account for navigation...
  render(){

    // const {navigation, route, roundMeme} = this.props
    const {roundMeme} = this.props
    // if(!navigation.isFocused()) {return null}
      return(
        <SafeAreaView style={styles.panel}>
          <ScrollView contentContainerStyle={styles.panel} onPress={Keyboard.dismiss}>

          <Text style={{fontSize: 45, color: 'white', textAlign: 'center', marginVertical: 10}}>MAKE YOUR CAPTION</Text>
          <View style={{justifyContent: 'flex-end' ,alignItems: 'center', marginBottom: 10}}>
            {
              (roundMeme && roundMeme.length) ? (
                <Image
                style={styles.memeimg}
                source={{uri: roundMeme}}
                />
              ) : (null)
            }
            <View style={{position: 'absolute', width: 300, height: 300, backgroundColor: 'rgba(249,166,2,0.5)', borderWidth: 3, borderColor: 'orange'}}>
              <Text style={{color: 'white', fontSize: 30, textAlign: 'center'}}>{(this.state.caption) || ""}</Text>
            </View>
            <View style={{display:`${this.state.display}` ,position: 'absolute',alignSelf: "flex-end",flexDirection: 'row', justifyContent:'flex-end' ,alignItems: 'center'}}>
              <View style={{backgroundColor:"gold", height: 80, width: 80, borderRadius: 40, justifyContent:'center', marginRight: 50}}>
              <Text style={{color: 'white', textAlign: 'center', fontSize: 25}}>{this.state.count}</Text>
              </View>
            </View>
          </View>
            {/* <Text style={{fontSize: 30,textAlign:'center', color: 'white'}}>{'Hurry before time is up!'}</Text> */}
          {/* <Text>{(this.state.caption) || 'Hurry before time is up!'}</Text> */}
          <Textarea
          // multiline={false}
          // numberOfLines={4}
          containerStyle={[styles.captionArea, {display: this.state.show}]}
          // containerStyle={{display: this.state.show}}
          value={this.state.caption}
          onChangeText={(caption) => this.setState({caption})}
          placeholder={'ENTER CAPTION HERE'}
          placeholderTextColor={'darkred'}
          maxLength={70}
          />
          {/* <FormButton title={'game lobby'} colorValue={'white'} modeValue={'contained'} onPress={()=> this.props.navigation.navigate("GameLobby")}/>
          <FormButton title={'next page'} colorValue={'white'} modeValue={'contained'} onPress={()=>this.props.navigation.navigate('VotingScreen')}/>
          {/* <Text>Time before page change: {this.state.count}</Text> */}
          </ScrollView>
        </SafeAreaView>
      )
  }
}

const styles = StyleSheet.create({
  panel:{
    flex: 1,
    backgroundColor: 'darkred'
  },
  memeimg:{
    width: 300,
    height:300,
    borderWidth: 3,
    borderColor: 'orange',
  },
  captionArea: {
    height: 24 * 3,
    width: width - 48,
    backgroundColor: 'white',
    borderRadius: 5,
    padding:10,
    alignSelf: 'center',
  }
})

const mapStateToProps = (state, ownProps) => {
  console.log("Here's the state from redux: ", state)
  // let ID = ownProps.route.params.gameID
  let ID = ownProps.GID
  let games = state.firestore.data.game
  let game = games ? games[ID] : null

  return(
    {
      hello: 'hello',
      game: game ? game : null,
      gameUsers: game ? game.users : null,
      roundMeme: game ? game.currentMeme : null
    }
  )
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    // { collection: 'game', doc: props.route.params.gameID}
    { collection: 'game', doc: props.GID}
  ])
)(CaptionInput)
