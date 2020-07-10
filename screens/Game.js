import React from 'react';
import { Text, View, Image, ScrollView, Button } from 'react-native';
import CaptionInput from './GameScreens/CaptionInput';
import GameLobby from './GameScreens/GameLobby';
import MemePresentation from './GameScreens/MemePresentation';
import RoundResults from './GameScreens/RoundResults';
import VotingScreen from './GameScreens/VotingScreen';
import WinningScreen from './GameScreens/WinningScreen';

export default class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: null,
      screen: 0,
      rounds: 0,
      intervalState: null,
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
    if (timer > 0) {
      return;
    } else {
      switch (this.state.screen) {
        case 1:
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
  render() {
    return (
      <View>
        <Text>{this.state.timer > 0 && this.state.timer}</Text>
        <Button title="Start Game" onPress={() => this.startGame()} />
        {this.state.screen === 0 ? (
          <GameLobby />
        ) : this.state.screen === 1 ? (
          <MemePresentation />
        ) : this.state.screen === 2 ? (
          <CaptionInput />
        ) : this.state.screen === 3 ? (
          <VotingScreen />
        ) : this.state.screen === 4 ? (
          <RoundResults />
        ) : (
          <WinningScreen />
        )}
      </View>
    );
  }
}
