import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet } from 'react-native';
import Fire from '../../constants/Fire';
import { FormButton } from '../../components/Reusables';

import * as firebase from 'firebase';
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'

class RoundResults extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      winMemeCap:  "flex",
      winMemer: 'flex',
      winningIndex : 0,
      mounted: 0
    }
  }
  async componentDidMount(){
  //   setTimeout(() => {
  //     // this.props.navigation.navigate('WinningScreen');
  //     // this.setState({winMemeCap: 'flex'})
  //  }, 2000);
  console.log("mounted")
  let gameDoc = await firebase.firestore().collection('game').doc(`${this.props.route.params.gameID}`).get()
  let accIndex = await gameDoc.data().inputs.reduce((acc, curInput, index)=>{
    // if(index === 0) { console.log("first index"); acc = index}
    if(curInput.vote > acc.maxV) { console.log("comparing indexes"); acc.maxV = curInput.vote; acc.index = index}
    console.log("acc: ", acc)
    return acc
  },{maxV: 0, index: 0})
  console.log("accIndex: ", accIndex.index)
    await gameDoc.data().users.forEach(async (curUser, index)=> {
      if((curUser.userId === gameDoc.data().inputs[accIndex.index].userId) && (curUser.userId === Fire.shared.getUID())){
        console.log("counted")
        let curUsers = gameDoc.data().users
        curUsers[index].wins = curUsers[index].wins + 1
        await gameDoc.ref.update({
          users: curUsers
        })
      }
    })

  console.log("AccIndex:",accIndex.index)
  this.setState({winningIndex: accIndex.index, mounted: 1})

  setTimeout(() => {
    this.props.navigation.navigate('WinningScreen', {gameID: this.props.route.params.gameID});
    // this.setState({winMemer: 'flex'})
  }, 4000);
  }

  render(){
    const {navigation, route, gameID, gameUsers, gameInputs, roundMeme} = this.props
    if(!navigation.isFocused()) {return null}
    console.log("winningIndex:", this.state.winningIndex)
    if(gameInputs && gameInputs.length){console.log("gameInputs winner", gameInputs[this.state.winningIndex])}

    return (
      <SafeAreaView style={styles.roundResults}>
        <Text style={{fontSize: 50, color: 'white', textAlign: 'center'}}>ROUND RESULTS</Text>
        <Text style={{fontSize: 20, color: 'white', textAlign: 'center', marginBottom: 10}}>The Winning Meme is...</Text>
        <View style={{display:this.state.winMemeCap, alignItems: 'center', width: 300, alignSelf:'center'}}>
          {roundMeme && roundMeme.length &&
            <Image
              style={styles.memeimg}
              source={{uri: roundMeme}}
            />
          }
          <View style={{backgroundColor: 'white', width: '100%'}}>
            {
              gameInputs && gameInputs.length && gameInputs[this.state.winningIndex] &&
              <Text style={{textAlign: 'center'}}>{gameInputs[this.state.winningIndex].caption}</Text>
            }
          </View>
        </View>
        <Text style={{fontSize: 20, color: 'white', textAlign: 'center', marginBottom: 10}}>Round Memer: </Text>
        <View style={{display: this.state.winMemer, backgroundColor: 'gold', height: 200, width: 200, borderRadius: 100, alignSelf: 'center', justifyContent: "center", alignItems: "center" }}>
          {
            gameUsers && gameUsers.length && gameInputs && gameInputs &&
            <>
              <Image
                style={styles.img}
                source={{uri: "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"}}
              />
              {
              gameUsers && gameUsers.length && gameInputs && gameInputs.length && gameInputs[this.state.winningIndex] &&
                gameUsers.map((user)=>{
                  console.log('checking')
                  if(user.userId === gameInputs[this.state.winningIndex].userId)
                  {
                    console.log("UDN: ", user.displayName)
                    return <Text style={{color: 'white'}}>{user.displayName.toUpperCase()}</Text>
                  }
                  else {
                    return null
                  }
                })
              }
            </>
          }
        </View>
        {/* <FormButton title={'next panel'} colorValue={'white'} modeValue={'contained'} onPress={()=> this.props.navigation.navigate("WinningScreen")}/>
        <FormButton title={'game lobby'} style={{marginTop: 'auto'}} colorValue={'white'} modeValue={'contained'} onPress={()=> this.props.navigation.navigate("GameLobby")}/> */}
      </SafeAreaView>
    )

  }
}

const styles = StyleSheet.create({
  roundResults:{
    flex: 1,
    backgroundColor: 'blue'
  },
  memeimg:{
    width: 300,
    height:300,
    borderWidth: 3,
    borderColor: 'orange',
  },
  img:{
    margin: 5,
    borderRadius: 100/2,
    borderWidth: 3,
    borderColor: 'darkred',
    width: 100,
    height:100
  }
});

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
      roundMeme: game ? game.currentMeme : null,
      gameInputs: game ? game.inputs : null
    }
  )
}

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    { collection: 'game', doc: props.route.params.gameID}
  ])
)(RoundResults)
