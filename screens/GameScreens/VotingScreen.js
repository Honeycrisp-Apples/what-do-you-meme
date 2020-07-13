import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet, Button, ImageBackground } from 'react-native';
import Fire from '../../constants/Fire';
import { FormButton } from '../../components/Reusables';
import { TouchableOpacity } from 'react-native-gesture-handler';

import * as firebase from 'firebase';
import {connect} from 'react-redux'
import {compose} from 'redux'
import {firestoreConnect} from 'react-redux-firebase'


class VotingScreen extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      count: 10
    }
  }
  componentDidMount(){
    let myvar1;
    const change = () => {
      if(this.state.count>0){
        this.setState({count: this.state.count-1})
      }else {
        clearInterval(myvar1)
        console.log('leaving to vote')
        // return this.props.navigation.navigate("RoundResults")
      }
    }
    myvar1 = setInterval(()=>change(), 1000)
  }

  render(){
    const {navigation, route, gameID, gameUsers, gameInputs} = this.props
    return (
      <SafeAreaView style={{flex:1, backgroundColor: 'darkred'}}>
        <ImageBackground style={styles.image} source={{uri: 'https://vignette.wikia.nocookie.net/starwars/images/d/d6/Yoda_SWSB.png/revision/latest?cb=20150206140125'}}imageStyle={{opacity:0.5}}>

        {/* <View style={{justifyContent: 'flex-end' ,alignItems: 'center'}}>
          <Image
          style={styles.memeimg}
          source={{uri: "https://vignette.wikia.nocookie.net/starwars/images/d/d6/Yoda_SWSB.png/revision/latest?cb=20150206140125"}}
          />
        </View> */}
        <Text style={{fontSize: 50, color: 'white', textAlign: 'center'}}>Cast Your Vote!</Text>
        <Text style={{fontSize: 20, color: 'white', textAlign: 'center', fontWeight: 'bold'}}>Which Is A Better Caption?</Text>
        <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>Time Left: {this.state.count}</Text>
          {/* this is where a map happens */}
          {
            gameInputs && gameInputs.length &&
            gameInputs.map((input, ind)=>{
              if(input.caption)
              return(
                <View key={ind} style={styles.captionToVote}>
                  <View style={{marginLeft: 5, flex: 1}}>
                    <Text style={{fontSize: 20, textAlign: 'center'}}>{input.caption}</Text>
                    {/* <TouchableOpacity title={"vote"} mode={'contained'} color={'darkred'} style={styles.votebtn}
                    onPress={()=> alert("Feature not developed yet.")}
                    >
                      <Text style={{color: 'white', }}>vote</Text>
                    </TouchableOpacity> */}
                    <FormButton title={"vote"} mode={'contained'} color={'darkred'} style={styles.votebtn}
                    onPress={()=> alert("Feature not developed yet.")}
                    />
                  </View>
                </View>
              )
            })
          }
        {/* <FormButton title={'game lobby'} colorValue={'white'} modeValue={'contained'} onPress={()=> this.props.navigation.navigate("GameLobby")}/> */}
        <FormButton title={'next page'} colorValue={'white'} modeValue={'contained'} onPress={()=>this.props.navigation.navigate('RoundResults')}/>
        {/* <Text>Time until next navigation: {this.state.count}</Text> */}
          </ImageBackground>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  captionToVote:{
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 10
  },
  memeimg:{
    width: 200,
    height:200,
    borderWidth: 3,
    borderColor: 'gold',
  },
  votebtn:{
    width: 50,
    backgroundColor: 'darkred',
    alignSelf: 'flex-end',
    marginRight: 24,
    padding: 10,
    borderRadius: 5
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    // backgroundColor: "rgba(255,0,0,0.3)"
    // opacity: 0.7
  },
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
)(VotingScreen)
