import React from 'react';
import { Text, View, Image, ScrollView, Button } from 'react-native';
import CaptionInput from './GameScreens/CaptionInput';
import GameLobby from './GameScreens/GameLobby';
import MemePresentation from './GameScreens/MemePresentation';
import RoundResults from './GameScreens/RoundResults';
import VotingScreen from './GameScreens/VotingScreen';
import WinningScreen from './GameScreens/WinningScreen';

import * as firebase from 'firebase';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timer: null,
      screen: 0,
      rounds: 0,
      intervalState: null,
      curMeme: "",
      game: {}
    };
    this.startGame = this.startGame.bind(this);
  }
  componentDidMount(){
    console.log("TheGameComp: ", this.props.route.params.gameID)
    this.startGame()
  }
  async startGame() {
    let theGame = await firebase.firestore().collection(`${this.props.route.params.whichGame}`).doc(`${this.props.route.params.gameID}`).get()
    this.setState({ timer: 10, screen: 0, game: theGame.data()});
    this.setState({ curMeme: this.state.game.roundMemes[0]})
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
  // async clearInputs(gameID){
  //   await firebase.firestore().collection('game').doc(`${gameID}`).update(
  //     {
  //       inputs: []
  //     }
  //   )
  // }
  checkGame(timer) {
    console.log('checking game');
    if (timer > 0) {
      return;
    } else {
      switch (this.state.screen) {
        case 0:
          this.setState({ screen: this.state.screen + 1, timer: 35 });
          break;
        case 1:
          this.setState({ screen: this.state.screen + 1, timer: 15 });
          break;
        // case 2:
        //   this.setState({ screen: this.state.screen + 1, timer: 3 });
        //   break;
        case 2:
          this.setState({
            screen: this.state.screen + 1,
            timer: 15,
            rounds: this.state.rounds + 1,
          });
          break;
        case 3:
          if (this.state.rounds === 3) {
            this.setState({
              screen: this.state.screen + 1,
              timer: 0,
            });
          } else {
            this.setState({ screen: 0, timer: 15 , curMeme: this.state.game.roundMemes[this.state.rounds]});

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
    const {gameID, whichGame} = this.props.route.params
    const roundMeme = this.state.curMeme
    const roundNum = this.state.rounds
    // if(this.state.screen === 0){
    //   this.clearInputs(gameID)
    // }
    return (
      // <View>
        /* <Text>{this.state.timer > 0 && this.state.timer}</Text> */
        /* <Button title="Start Game" onPress={() => this.startGame()} /> */
        // {
        // this.state.screen === 0 ? (
        //   <GameLobby />
        // ) :
        this.state.screen === 0 ? (
          <MemePresentation  roundNum={roundNum} roundMeme={roundMeme} GID={gameID} gameType={whichGame}/>
        ) : this.state.screen === 1 ? (
          <CaptionInput roundMeme={roundMeme} GID={gameID} gameType={whichGame}/>
        ) : this.state.screen === 2 ? (
          <VotingScreen roundMeme={roundMeme} GID={gameID} gameType={whichGame}/>
        ) : this.state.screen === 3 ? (
          <RoundResults roundMeme={roundMeme} GID={gameID} gameType={whichGame}/>
        ) : (
          <WinningScreen GID={gameID} gameType={whichGame} />
        )
      // }
      // </View>
    );
  }
}
