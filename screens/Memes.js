import React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import axios from 'axios';

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
        console.log('memes', data.data.data.memes);
        this.setState({ shuffledData: shuffle(data.data.data.memes) });
      })
      .catch((error) => console.log(error));
  }
  render() {
    return (
      <View>
        <ScrollView>
          {
            this.state.shuffledData && this.state.shuffledData[0] && (
              <View key={this.state.shuffledData[0].id}>
                <Image
                  source={{ uri: this.state.shuffledData[0].url }}
                  style={{
                    width: this.state.shuffledData[0].width * 0.3,
                    height: this.state.shuffledData[0].height * 0.3,
                  }}
                  resizeMode="contain"
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
