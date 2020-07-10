import React from 'react'
import { SafeAreaView, View, Text, Image, StyleSheet, Keyboard} from 'react-native';
import Fire from '../../constants/Fire';
import {FormButton, FormInput, FormTextArea} from '../../components/Reusables'
import { ScrollView } from 'react-native-gesture-handler';

export default class CaptionInput extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      count: 30, caption: ''
    }
    this.captionChange = this.captionChange.bind(this)
  }
  captionChange(){
    this.setState({caption: ''})
  }
  componentDidMount(){
    let myvar1;
    const change = () => {
      if(this.state.count>0){
        this.setState({count: this.state.count-1})
      }else {
        clearInterval(myvar1)
        console.log('leaving to vote')
        // return this.props.navigation.navigate("VotingScreen")
      }
    }
    myvar1 = setInterval(()=>change(), 1000)
  }
  render(){
      return(
        <SafeAreaView style={styles.panel}>
          <ScrollView contentContainerStyle={styles.panel} onPress={Keyboard.dismiss}>

          <Text style={{fontSize: 40, color: 'white', textAlign: 'center', marginVertical: 10}}>MAKE YOUR CAPTION</Text>
          <View style={{justifyContent: 'flex-end' ,alignItems: 'center'}}>
            <Image
            style={styles.memeimg}
            source={{uri: "https://vignette.wikia.nocookie.net/starwars/images/d/d6/Yoda_SWSB.png/revision/latest?cb=20150206140125"}}
            />
            <View style={{display:`${this.state.display}` ,position: 'absolute',alignSelf: "flex-end",flexDirection: 'row', justifyContent:'flex-end' ,alignItems: 'center'}}>
              <View style={{backgroundColor:"gold", height: 60, width: 60, borderRadius: 30, justifyContent:'center', marginRight: 50}}>
              <Text style={{color: 'white', textAlign: 'center', fontSize: 25}}>{this.state.count}</Text>
              </View>
            </View>
          </View>
          <Text style={{fontSize: 30,textAlign:'center', color: 'white'}}>{(this.state.caption) || 'Hurry before time is up!'}</Text>
          {/* <Text>{(this.state.caption) || 'Hurry before time is up!'}</Text> */}
          <FormInput
          // multiline={true}
          // numberOfLines={4}
          // style={styles.captionArea}
          value={this.state.caption}
          onChangeText={(caption) => this.setState({caption})}
          placeholder={'ENTER CAPTION HERE'}
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
    // height: 24 * 5,
    marginHorizontal: 24
  }
})
