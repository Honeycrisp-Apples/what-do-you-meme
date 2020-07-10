import React from 'react'
import { SafeAreaView, View, Text, Image, StyleSheet} from 'react-native';
import Fire from '../../constants/Fire';
import {FormButton} from '../../components/Reusables'

export default class GameLobby extends React.Component{
  render(){
    return(
      <SafeAreaView style={styles.lobby}>
        <Text>Game Lobby!</Text>
          <Text>Waiting for users...</Text>
        {/* this is where a map happens */}
        <View style={styles.user}>
          <Image
          style={styles.img}
          source={require('../../assets/images/icon.png')}
          />
          <Text>DISPLAY NAME</Text>
          <Text>MEMER POINTS:</Text>
        </View>
        <View style={styles.user}>
          <Image
          style={styles.img}
          source={require('../../assets/images/icon.png')}
          />
          <Text>DISPLAY NAME</Text>
          <Text>MEMER POINTS:</Text>
        </View>
        <View style={styles.user}>
          <Image
          style={styles.img}
          source={require('../../assets/images/icon.png')}
          />
          <Text>DISPLAY NAME</Text>
          <Text>MEMER POINTS:</Text>
        </View>
        <FormButton title={'leave game'} modeValue={'contained'} onPress={()=> this.props.navigation.navigate("Welcome")}/>
        <FormButton title={'next panel'} modeValue={'contained'} onPress={()=> this.props.navigation.navigate("MemePresentation")}/>
      </SafeAreaView>
    )
  }
}

const styles=StyleSheet.create({
  lobby:{},
  user:{},
  img:{
    borderRadius: 100/2,
    borderWidth: 3,
    borderColor: 'darkred',
    width: 100,
    height:100
  }

})
