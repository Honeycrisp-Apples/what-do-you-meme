import React from 'react';
import { Text, View, Image, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import Fire from '../constants/Fire';
import firebase from 'firebase';

export default class Memes extends React.Component {
  constructor() {
    super();
    this.state = {
      shuffledData: [],
    };
  }
  componentDidMount() {
    const shuffle = (arr) => arr.sort(() => 0.5 - Math.random());
    axios
      .get('https://api.imgflip.com/get_memes')
      .then((data) => {
        // console.log('memes', data.data.data.memes);
        this.setState({ shuffledData: shuffle(data.data.data.memes) });

        //save url to database

        //   firebase
        //     .firestore()
        //     .collection('game')
        //     .doc()
        //     .get()
        //     .then((query) => {
        //       if (query.docs.length) {
        //         const thing = query.docs[0];
        //         console.log('query', query.docs);

        //         thing.ref.update({
        //           roundOneMeme: this.state.shuffledData[0].url,
        //           roundTwoMeme: this.state.shuffledData[0].url,
        //           roundThreeMeme: this.state.shuffledData[0].url,
        //         });
        //       }
        //     })
        //     .catch((err) => {
        //       return console.log(err, "Couldn't find it");
        //     });
      })
      .catch((error) => console.log(error));
  }
  render() {
    return (
      <View>
        <ScrollView>
          {
            this.state.shuffledData && this.state.shuffledData[0] && (
              <View
                key={this.state.shuffledData[0].id}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Image
                  source={{ uri: this.state.shuffledData[0].url }}
                  // style={{
                  //   flex: 1,
                  //   width: 370,
                  //   height: 550,
                  //   resizeMode: 'contain',
                  // }}
                  style={styles.memeimg}
                />
              </View>
            )

            //maps through all meme images
            // this.state.shuffledData.map((meme) => {
            //   return (
            //     <View key={meme.id}>
            //       <Image
            //         source={{ uri: meme.url }}
            //         style={{
            //           width: meme.width * 0.3,
            //           height: meme.height * 0.3,
            //         }}
            //         resizeMode="contain"
            //       />
            //     </View>
            //   );
            // })
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  memeimg: {
    width: 300,
    height: 300,
    borderWidth: 3,
    borderColor: 'gold',
  },
});
