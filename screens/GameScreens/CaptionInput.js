import React from 'react'
import { SafeAreaView, View, Text, Image, StyleSheet, Keyboard, Dimensions} from 'react-native';
import Fire from '../../constants/Fire';
import {FormButton, FormInput, FormTextArea} from '../../components/Reusables'
import { ScrollView } from 'react-native-gesture-handler';
import Textarea from 'react-native-textarea';
import { Audio } from 'expo-av';
// const soundObject = new Audio.Sound();
import {
  Player,
  Recorder,
  MediaStates
} from '@react-native-community/audio-toolkit';

const { width, height } = Dimensions.get('screen');
export default class CaptionInput extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      count: 10, caption: '', show:"flex", player: "new Player('../../assets/audio/Tick-DeepFrozenApps-397275646.mp3')"
    }
    this.captionChange = this.captionChange.bind(this)
    // this.loadSound()
  }
  // async loadSound(){
  //   if(!(await soundObject.getStatusAsync()).isLoaded){
  //   console.log("hit me!")
  //   await soundObject.loadAsync(require('../../assets/audio/Tick-DeepFrozenApps-397275646.mp3'));
  //   await soundObject.playAsync();
  //   }
  // }
  // async playSound(){
  //   await soundObject.unloadAsync()
  //   await soundObject.loadAsync(require('../../assets/audio/Tick-DeepFrozenApps-397275646.mp3'));
  //   await soundObject.playAsync()
  // }
  captionChange(){
    this.setState({caption: ''})
  }
  async componentDidMount(){
    //this is somehow still going when we dismount.....
    let myvar1;

    const change = async () => {
      if(this.state.count>0){
        // await soundObject.replayAsync()
        // this.playSound()
        this.setState({count: this.state.count-1})
      }else {
        clearInterval(myvar1)
        Keyboard.dismiss()
        this.setState({show: 'none'})

        console.log('leaving to vote')
        // return this.props.navigation.navigate("VotingScreen")
      }
    }
    myvar1 = setInterval(()=>change(), 1000)
  }
  async componentWillUnmount(){
    await soundObject.unloadAsync()
  }
  //have a component will unmount to GameObj.unputs.push(this.state.caption) to account for navigation...
  render(){
      return(
        <SafeAreaView style={styles.panel}>
          <ScrollView contentContainerStyle={styles.panel} onPress={Keyboard.dismiss}>

          <Text style={{fontSize: 45, color: 'white', textAlign: 'center', marginVertical: 10}}>MAKE YOUR CAPTION</Text>
          <View style={{justifyContent: 'flex-end' ,alignItems: 'center', marginBottom: 10}}>
            <Image
            style={styles.memeimg}
            source={{uri: "https://vignette.wikia.nocookie.net/starwars/images/d/d6/Yoda_SWSB.png/revision/latest?cb=20150206140125"}}
            />
            <View style={{position: 'absolute', width: 300, height: 300, backgroundColor: 'rgba(249,166,2,0.5)', borderWidth: 3, borderColor: 'orange'}}>
              <Text style={{color: 'white', fontSize: 30, textAlign: 'center'}}>{(this.state.caption) || ""}</Text>
            </View>
            <View style={{display:`${this.state.display}` ,position: 'absolute',alignSelf: "flex-end",flexDirection: 'row', justifyContent:'flex-end' ,alignItems: 'center'}}>
              <View style={{backgroundColor:"gold", height: 80, width: 80, borderRadius: 40, justifyContent:'center', marginRight: 50}}>
              <Text style={{color: 'white', textAlign: 'center', fontSize: 25}}>{this.state.count}</Text>
              </View>
            </View>
          </View>
            {/* <Text style={{fontSize: 30,textAlign:'center', color: 'white'}}>{'Hurry before time is up!'}</Text> */}
          {/* <Text>{(this.state.caption) || 'Hurry before time is up!'}</Text> */}
          <Textarea
          // multiline={false}
          // numberOfLines={4}
          containerStyle={[styles.captionArea, {display: this.state.show}]}
          // containerStyle={{display: this.state.show}}
          value={this.state.caption}
          onChangeText={(caption) => this.setState({caption})}
          placeholder={'ENTER CAPTION HERE'}
          placeholderTextColor={'darkred'}
          maxLength={70}
          />
          <FormButton title={'game lobby'} colorValue={'white'} modeValue={'contained'} onPress={()=> this.props.navigation.navigate("GameLobby")}/>
          <FormButton title={'next page'} colorValue={'white'} modeValue={'contained'} onPress={()=>this.props.navigation.navigate('VotingScreen')}/>
          {/* <Text>Time before page change: {this.state.count}</Text> */}
          </ScrollView>
        </SafeAreaView>
      )
  }
}

const styles = StyleSheet.create({
  panel:{
    flex: 1,
    backgroundColor: 'darkred'
  },
  memeimg:{
    width: 300,
    height:300,
    borderWidth: 3,
    borderColor: 'orange',
  },
  captionArea: {
    height: 24 * 3,
    width: width - 48,
    backgroundColor: 'white',
    borderRadius: 5,
    padding:10,
    alignSelf: 'center',
  }
})
