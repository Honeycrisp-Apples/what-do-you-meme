import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet } from 'react-native';
import Fire from '../../constants/Fire';
import { FormButton } from '../../components/Reusables';
import * as firebase from 'firebase';
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'
import { useCollection, useDocument, useDocumentOnce } from 'react-firebase-hooks/firestore';
import  { useState, useEffect } from 'react';


export default function MemePresentation (props){

  // constructor(props){
  //   super(props)
  //   this.state={
  //     display: 'none'
  //   }
  // }
  // componentDidMount(){
  //   setTimeout(() => {
  //     // this.props.navigation.push('CaptionInput', {gameID: this.props.route.params.gameID});
  //     this.setState({display: 'flex'})
  //  }, 2500);
  //  this.unsubscribe = firebase.firestore().collection('game').doc(`${this.props.route.params.gameID}`)
  //  .onSnapshot({includeMetadataChanges: true}, async function(gameDoc){
  //    console.log("This is the gameDoc:", gameDoc)
  //    // return await gameDoc.ref.update({
  //    //   playing: true
  //    // })
  //  })
  // }
  // componentWillUnmount(){
  //   this.unsubscribe()
  // }

  // useEffect(()=> {
    // setTimeout(() => {
    //   // this.props.navigation.push('CaptionInput', {gameID: this.props.route.params.gameID});
    //   this.setState({display: 'flex'})
    // }, 2500);
    // let unsubscribe = firebase.firestore().collection('game').doc(`${props.route.params.gameID}`)
    // .onSnapshot({includeMetadataChanges: true}, async function(gameDoc){
    //   console.log("This is the gameDoc:", gameDoc)
    //   // return await gameDoc.ref.update({
    //   //   playing: true
    //   // })
    // })
  // },[])


  let [value, loading, error] = useDocument(
    firebase.firestore().collection(`${props.gameType}`).doc(`${props.GID}`),
    // firebase.firestore().collection('game').doc(`${props.route.params.gameID}`),
    // {
    //   snapshotListenOptions: { includeMetadataChanges: true },
    // }
  );
  // if(!props.navigation.isFocused()) {return null}


  // useEffect(()=> {
  //   const callMe = async function (){
  //     if(value){
  //       await value.update({
  //         inputs: []
  //       })
  //     }
  //   }
  //   callMe()
  // }, [])


  // useEffect(() => {
  //   const unsubscribe = props.navigation.addListener('focus', () => {
  //     // The screen is focused
  //     // Call any action
  //     console.log("Meme Presentation is focused!")
  //   });
  //   // Return the function to unsubscribe from the event so it gets removed on unmount
  //   return () => { value = null; loading = null; error = null; console.log("MEME NULLS: ", value, loading, error);
  //   return unsubscribe()};
  // }, [props.navigation.navigate]);


  // let value = null
  // let error = null
  // let loading = null
  // useEffect(()=>{
  //   const unsubscribe = async () => {
  //     const gameDoc = await firebase.firestore().collection('game').doc(`${props.route.params.gameUID}`).get()
  //     value = gameDoc
  //   }
  //   return () => unsubscribe()
  // },[props.route.params.gameID])

  // const [error, setError] = React.useState(false)
  // const [loading, setLoading] = React.useState(true)
  // const [value, setValue] = React.useState(null)

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
  //   return () => {console.log("Unmounted?"); return unsubscribe()}
  // },[props.route.params.gameID])

    useEffect(()=>{
      const callMe = async () => {
        firebase.firestore().collection(`${props.gameType}`).doc(`${props.GID}`).update({
          inputs: []
        })
      }
      callMe()
    },[])
  // render(){
    // const {gameUsers, roundMeme, route} = this.props


    // const clearInputs = async (gameID) => {
    //   await firebase.firestore().collection('game').doc(`${gameID}`).update(
    //     {
    //       inputs: []
    //     }
    //   )
    // }

    if (error) {
      return <Text>Error: {JSON.stringify(error)}</Text>;
    } else if (loading) {
      return <Text>Collection: Loading...</Text>;
    } else if (value) {
      console.log('value', value.data());
      // setTimeout(() => {
        // props.navigation.push('CaptionInput', {gameID: props.route.params.gameID});
        // this.setState({display: 'flex'})
      // }, 2500);
      // clearInputs(props.GID)
      const {roundMeme} = props
    return(
      <View style={{flex: 1, backgroundColor: 'lightblue'}}>
    <SafeAreaView style={{ flex:1}}>
      <Text style={{fontFamily: 'FredokaOne_400Regular', fontSize: 50, color: 'blue', textAlign: 'center', padding: 10}}>ROUND {`${props.roundNum}`}</Text>
      <Text style={{fontFamily: 'FredokaOne_400Regular', fontSize: 30, color: 'white', textAlign: 'center', marginBottom: 20}}>Here we go!</Text>
      <View style={{justifyContent: 'flex-end' ,alignItems: 'center', backgroundColor: 'blue', padding: 20}}>
        {
        // roundMeme && roundMeme.length &&
        // value && value.data() && value.data().currentMeme && value.data().currentMeme.length &&
        (roundMeme && roundMeme.length) ? (
          <Image
          style={styles.memeimg}
          // source={{uri: `${roundMeme}`}}
          // source={{uri: `${value.data().currentMeme}`}}
          source={{uri: `${roundMeme}`}}
          />
        ) : null
        }
      {/* <View style={{display:`${this.state.display}` ,position: 'absolute',alignSelf: "flex-end",flexDirection: 'row', justifyContent:'flex-end' ,alignItems: 'center'}}>
        <View style={{backgroundColor:"gold", height: 60, width: 60, borderRadius: 30, justifyContent:'center', marginRight: 30}}>
        <Text style={{color: 'white', textAlign: 'center', fontSize: 25}}>G0!</Text>
        </View>
      </View> */}
      </View>
      <View style={styles.players}>
        {
          // gameUsers && gameUsers.length &&
          // gameUsers.map((user)=> {
          (value && value.data() && value.data().users && value.data().users.length)?(
            value.data().users.map((user)=> {
              if(user.userId !== Fire.shared.getUID()){
                return (
                  <View key={user.userId} style={{alignItems: "center"}}>
                    <Image
                    style={styles.img}
                    source={{uri:`${user.imageURL}`}}
                    />
                    <View style={{ marginTop: 10, height: 30, paddingHorizontal: 5, borderRadius: 5, backgroundColor: 'white', justifyContent: 'center'}}>
                      <Text style={{fontSize: 20, color: 'blue'}}>{`${user.displayName}` || "Mario"}</Text>
                    </View>
                  </View>
                )
              }
            })
          ): null
        }
      </View>
      {/* <FormButton title={'next page'} colorValue={'white'} modeValue={'contained'} onPress={()=>props.navigation.navigate('CaptionInput', {gameID: props.route.params.gameID})}/> */}
    </SafeAreaView>
      </View>
    )
  }
  return <Text style={{fontSize: 50}}>Hello, MP</Text>
}


const styles = StyleSheet.create({
  memeimg:{
    width: 300,
    height:350,
    resizeMode: 'contain',
    // borderWidth: 3,
    // borderColor: 'gold',
  },
  players:{
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  img:{
    margin: 5,
    borderRadius: 100/2,
    borderWidth: 3,
    borderColor: 'blue',
    width: 100,
    height:100
  }
})

// const mapStateToProps = (state, ownProps) => {
//   console.log("Here's the state from redux: ", state)
//   let ID = ownProps.route.params.gameID
//   let games = state.firestore.data.game
//   let game = games ? games[ID] : null

//   return(
//     {
//       hello: 'hello',
//       game: game ? game : null,
//       gameUsers: game ? game.users : null,
//       roundMeme: game ? game.currentMeme : null
//     }
//   )
// }

// export default compose(
//   connect(mapStateToProps),
//   firestoreConnect((props) => [
//     { collection: 'game', doc: props.route.params.gameID}
//   ])
// )(MemePresentation)

