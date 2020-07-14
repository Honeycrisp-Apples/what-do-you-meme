import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet } from 'react-native';
import Fire from '../../constants/Fire';
import { FormButton } from '../../components/Reusables';

import * as firebase from 'firebase';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { textChangeRangeIsUnchanged } from 'typescript';

class RoundResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      winMemeCap: 'flex',
      winMemer: 'flex',
    };
  }
  componentDidMount() {
    //   setTimeout(() => {
    //     // this.props.navigation.navigate('WinningScreen');
    //     // this.setState({winMemeCap: 'flex'})
    //  }, 2000);
    setTimeout(() => {
      this.props.navigation.navigate('WinningScreen', {
        gameID: this.props.route.params.gameID,
      });
      // this.setState({winMemer: 'flex'})
    }, 4000);
  }

  // async whoWon() {
  //   let winningIndex = 0;
  //   await firebase
  //     .firestore()
  //     .collection('game')
  //     .doc(`${this.props.route.params.gameID}`)
  //     .get()
  //     .then((gameDoc) => {
  //       winningIndex = gameDoc.data().inputs.reduce((acc, curInput, index) => {
  //         if (index === 0) {
  //           acc = index;
  //         } else if (curInput.vote >= gameDoc.data().inputs[index--].vote) {
  //           acc = index;
  //         }
  //         console.log('acc: ', acc);
  //         return acc;
  //       }, 0);
  //     });
  //   console.log('win index: ', winningIndex);
  //   return winningIndex;
  // }
  // eslint-disable-next-line complexity

  render() {
    const {
      navigation,
      route,
      gameID,
      gameUsers,
      gameInputs,
      roundMeme,
    } = this.props;
    if (!navigation.isFocused()) {
      return null;
    }
    // const winnerFunc = async () => await this.whoWon()
    // const winner = winnerFunc()
    // console.log(winner)
    // if(gameInputs && gameInputs.length){console.log("gameInputs winner", gameInputs[winner])}
    //look through array of whoever's in the room and see if it matches the user's current Id
    //add new player if new Id matches
    return (
      <SafeAreaView style={styles.roundResults}>
        <Text style={{ fontSize: 50, color: 'white', textAlign: 'center' }}>
          ROUND RESULTS
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: 'white',
            textAlign: 'center',
            marginBottom: 10,
          }}
        >
          The Winning Meme is...
        </Text>
        <View
          style={{
            display: this.state.winMemeCap,
            alignItems: 'center',
            width: 300,
            alignSelf: 'center',
          }}
        >
          {roundMeme && roundMeme.length && (
            <Image style={styles.memeimg} source={{ uri: roundMeme }} />
          )}
          <View style={{ backgroundColor: 'white', width: '100%' }}>
            {gameInputs && gameInputs.length && gameInputs[1] && (
              <Text style={{ textAlign: 'center' }}>
                {gameInputs[1].caption}
              </Text>
            )}
          </View>
        </View>
        <Text
          style={{
            fontSize: 20,
            color: 'white',
            textAlign: 'center',
            marginBottom: 10,
          }}
        >
          Round Memer:{' '}
        </Text>
        <View
          style={{
            display: this.state.winMemer,
            backgroundColor: 'gold',
            height: 200,
            width: 200,
            borderRadius: 100,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {gameUsers && gameUsers.length && gameInputs && gameInputs.length && (
            <View>
              {console.log(gameUsers, 'gameUsers')}
              <Image
                style={styles.img}
                source={{
                  uri:
                    'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg',
                }}
              />
              {gameUsers &&
                gameUsers.length &&
                gameInputs &&
                gameInputs.length &&
                gameUsers.forEach((user, i) => {
                  console.log('checking');
                  console.log('game Inputs', gameInputs);
                  console.log('displayName', user.displayName);
                  {
                    // gameInputs[i].vote === Math.max(gameInputs.vote) &&
                    user.userId === gameInputs[i].userId &&
                      console.log('gameInput userId', gameInputs[i].userId);
                    console.log('votes', gameInputs[i].vote);
                    console.log('UDN', user.displayName[i]);
                    return (
                      <Text style={{ color: 'white' }}>
                        {/* {user.displayName[i]} */}
                        Testing Are you here?
                      </Text>
                    );
                  }
                })}
            </View>
          )}
        </View>
        {/* <FormButton title={'next panel'} colorValue={'white'} modeValue={'contained'} onPress={()=> this.props.navigation.navigate("WinningScreen")}/>
        <FormButton title={'game lobby'} style={{marginTop: 'auto'}} colorValue={'white'} modeValue={'contained'} onPress={()=> this.props.navigation.navigate("GameLobby")}/> */}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  roundResults: {
    flex: 1,
    backgroundColor: 'blue',
  },
  memeimg: {
    width: 300,
    height: 300,
    borderWidth: 3,
    borderColor: 'orange',
  },
  img: {
    margin: 5,
    borderRadius: 100 / 2,
    borderWidth: 3,
    borderColor: 'darkred',
    width: 100,
    height: 100,
  },
});

const mapStateToProps = (state, ownProps) => {
  console.log("Here's the state from redux: ", state);
  let ID = ownProps.route.params.gameID;
  let games = state.firestore.data.game;
  let game = games ? games[ID] : null;

  return {
    hello: 'hello',
    game: game ? game : null,
    gameUsers: game ? game.users : null,
    roundMeme: game ? game.currentMeme : null,
    gameInputs: game ? game.inputs : null,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect((props) => [
    { collection: 'game', doc: props.route.params.gameID },
  ])
)(RoundResults);
