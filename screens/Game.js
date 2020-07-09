import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      timer: null,
      screen: 0,
    };
  }
  startTimer(duration, display) {
    let timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10)
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}
  checkGame(timer) {
      if (timer > 0) {
          return;
      } else {
          switch() {
              case 1: screenName

          }
      }
  }
}
