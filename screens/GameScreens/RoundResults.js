import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet } from 'react-native';
import Fire from '../../constants/Fire';
import { FormButton } from '../../components/Reusables';



export default class RoundResults extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      winMemeCap:  "none",
      winMemer: 'none'
    }
  }
  componentDidMount(){
    setTimeout(() => {
      // this.props.navigation.navigate('WinningScreen');
      this.setState({winMemeCap: 'flex'})
   }, 2000);
   setTimeout(() => {
    // this.props.navigation.navigate('WinningScreen');
    this.setState({winMemer: 'flex'})
 }, 4000);
  }
  render(){
    return (
      <SafeAreaView style={styles.roundResults}>
        <Text style={{fontSize: 50, color: 'white', textAlign: 'center'}}>ROUND RESULTS</Text>
        <Text style={{fontSize: 20, color: 'white', textAlign: 'center', marginBottom: 10}}>The Winning Meme is...</Text>
        <View style={{display:this.state.winMemeCap, alignItems: 'center', width: 300, alignSelf:'center'}}>
          <Image
            style={styles.memeimg}
            source={{uri: 'https://vignette.wikia.nocookie.net/starwars/images/d/d6/Yoda_SWSB.png/revision/latest?cb=20150206140125'}}
          />
          <View style={{backgroundColor: 'white', width: '100%'}}>
            <Text style={{textAlign: 'center'}}>IM THE WINNING INPUT FROM THE GAME BASK IN MY GLORY</Text>
          </View>
        </View>
        <Text style={{fontSize: 20, color: 'white', textAlign: 'center', marginBottom: 10}}>Round Memer: </Text>
        <View style={{display: this.state.winMemer, backgroundColor: 'gold', height: 200, width: 200, borderRadius: 100, alignSelf: 'center', justifyContent: "center", alignItems: "center" }}>
          <Image
            style={styles.img}
            source={{uri: "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"}}
          />
          <Text style={{color: 'white'}}>DISPLAY NAME</Text>
        </View>
        <FormButton title={'next panel'} colorValue={'white'} modeValue={'contained'} onPress={()=> this.props.navigation.navigate("WinningScreen")}/>
        <FormButton title={'game lobby'} style={{marginTop: 'auto'}} colorValue={'white'} modeValue={'contained'} onPress={()=> this.props.navigation.navigate("GameLobby")}/>
      </SafeAreaView>
    )

  }
}

const styles = StyleSheet.create({
  roundResults:{
    flex: 1,
    backgroundColor: 'blue'
  },
  memeimg:{
    width: 300,
    height:300,
    borderWidth: 3,
    borderColor: 'orange',
  },
  img:{
    margin: 5,
    borderRadius: 100/2,
    borderWidth: 3,
    borderColor: 'darkred',
    width: 100,
    height:100
  }
});
