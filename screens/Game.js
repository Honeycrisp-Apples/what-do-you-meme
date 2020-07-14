/* eslint-disable complexity */
import React from 'react';
import { Text, View, Image, ScrollView, Button } from 'react-native';
import CaptionInput from './GameScreens/CaptionInput';
import GameLobby from './GameScreens/GameLobby';
import MemePresentation from './GameScreens/MemePresentation';
import RoundResults from './GameScreens/RoundResults';
import VotingScreen from './GameScreens/VotingScreen';
import WinningScreen from './GameScreens/WinningScreen';
import firebase from 'firebase';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: null,
      screen: 0,
      rounds: 0,
      intervalState: null,
      curMeme: '',
    };
    this.startGame = this.startGame.bind(this);
  }

  startGame() {
    this.setState({ timer: 3, screen: 1 });
    this.startInterval(60);
  }

  startInterval() {
    let localThis = this;

    this.setState({
      intervalState: setInterval(function () {
        let seconds = localThis.state.timer - 1;
        localThis.setState({ timer: seconds });
        localThis.checkGame(seconds);
      }, 1000),
    });
  }

  checkGame(timer) {
    console.log('checking game');
    // console.log('route', this.props.route.params.gameID);
    // let gameId = this.props.route.params.gameID;

    // let gameValue = firebase.firestore().collection('game').doc(`${gameID}`).get();
    // console.log('Game Value Meme', gameValue.roundOneMeme);
    // gameValue
    //   .get()
    //   .then(function (doc) {
    //     if (doc.exists) {
    //       console.log('Document data:', doc.data());
    //     } else {
    //       // doc.data() will be undefined in this case
    //       console.log('No such document!');
    //       console.log('GameValue Meme', gameValue.roundOneMeme);
    //     }
    //   })
    //   .catch(function (error) {
    //     console.log('Error getting document:', error);
    //   });
    if (timer > 0) {
      return;
    } else {
      switch (this.state.screen) {
        case 1:
          // if (this.state.rounds === 0) {
          //   this.setState({ curMeme: gameValue.roundMemes[0] });
          // } else if (this.state.rounds === 1) {
          //   this.setState({ curMeme: gameValue.roundMemes[1] });
          // } else if (this.state.rounds === 2) {
          //   this.setState({ curMeme: gameValue.roundMemes[2] });
          // }
          this.setState({ screen: this.state.screen + 1, timer: 2 });
          break;
        case 2:
          this.setState({ screen: this.state.screen + 1, timer: 3 });
          break;
        case 3:
          this.setState({
            screen: this.state.screen + 1,
            timer: 2,
            rounds: this.state.rounds + 1,
          });
          break;
        case 4:
          if (this.state.rounds === 3) {
            this.setState({
              screen: this.state.screen + 1,
              timer: 0,
            });
          } else {
            this.setState({ screen: 1, timer: 3 });
          }
          break;

        default:
          clearInterval(this.state.intervalState);
          return;
      }
    }
  }
  // have a state for memes, setState of current meme and pass it down to MemePresentation, CaptionInput, Voting Screen, Round Results
  //redux firebase needed for anyplace where user is updating object
  render() {
    return (
      <View>
        <Text>{this.state.timer > 0 && this.state.timer}</Text>
        <Button title="Start Game" onPress={() => this.startGame()} />
        {this.state.screen === 0 ? (
          <GameLobby />
        ) : this.state.screen === 1 ? (
          <MemePresentation meme={this.state.curMeme} />
        ) : this.state.screen === 2 ? (
          <CaptionInput meme={this.state.curMeme} />
        ) : this.state.screen === 3 ? (
          <VotingScreen meme={this.state.curMeme} />
        ) : this.state.screen === 4 ? (
          <RoundResults meme={this.state.curMeme} />
        ) : (
          <WinningScreen />
        )}
      </View>
    );
  }
}
