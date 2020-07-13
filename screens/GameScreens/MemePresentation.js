import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet } from 'react-native';
import Fire from '../../constants/Fire';
import { FormButton } from '../../components/Reusables';
import * as firebase from 'firebase';
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'


class MemePresentation extends React.Component {


  constructor(props){
    super(props)
    this.state={
      display: 'none'
    }
  }
  componentDidMount(){
    setTimeout(() => {
      // this.props.navigation.push('CaptionInput', {gameID: this.props.route.params.gameID});
      this.setState({display: 'flex'})
   }, 2500);
   this.unsubscribe = firebase.firestore().collection('game').doc(`${this.props.route.params.gameID}`)
   .onSnapshot({includeMetadataChanges: true}, async function(gameDoc){
     console.log("This is the gameDoc:", gameDoc)
     // return await gameDoc.ref.update({
     //   playing: true
     // })
   })
  }
  componentWillUnmount(){
    this.unsubscribe()
  }

  render(){
    const {gameUsers, roundMeme, route} = this.props
    return(
    <SafeAreaView style={{backgroundColor: 'darkred', flex:1}}>
      <Text style={{fontSize: 50, color: 'white', textAlign: 'center'}}>ROUND 1</Text>
      <Text style={{fontSize: 20, color: 'white', textAlign: 'center', marginBottom: 10}}>Here we go...</Text>
      <View style={{justifyContent: 'flex-end' ,alignItems: 'center'}}>
        {
        roundMeme && roundMeme.length &&
        <Image
        style={styles.memeimg}
        source={{uri: `${roundMeme}`}}
        />
        }
      <View style={{display:`${this.state.display}` ,position: 'absolute',alignSelf: "flex-end",flexDirection: 'row', justifyContent:'flex-end' ,alignItems: 'center'}}>
        <View style={{backgroundColor:"gold", height: 60, width: 60, borderRadius: 30, justifyContent:'center', marginRight: 30}}>
        <Text style={{color: 'white', textAlign: 'center', fontSize: 25}}>G0!</Text>
        </View>
      </View>
      </View>
      <View style={styles.players}>
        {
          gameUsers && gameUsers.length &&
          gameUsers.map((user)=> {
            if(user.userId !== Fire.shared.getUID()){
              return (
                <View key={user.userId} style={{alignItems: "center"}}>
                  <Image
                  style={styles.img}
                  source={{uri:`${user.imageURL}`}}
                  />
                  <Text style={{fontSize: 20, color: 'white'}}>{`${user.displayName}` || "Mario"}</Text>
                </View>
              )
            }
          })
        }
      </View>
      <FormButton title={'next page'} colorValue={'white'} modeValue={'contained'} onPress={()=>this.props.navigation.push('CaptionInput', {gameID: route.params.gameID})}/>
    </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  memeimg:{
    width: 300,
    height:300,
    borderWidth: 3,
    borderColor: 'gold',
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
    borderColor: 'darkred',
    width: 100,
    height:100
  }
})

const mapStateToProps = (state, ownProps) => {
  console.log("Here's the state from redux: ", state)
  let ID = ownProps.route.params.gameID
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
    { collection: 'game', doc: props.route.params.gameID}
  ])
)(MemePresentation)

