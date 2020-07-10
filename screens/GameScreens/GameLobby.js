import React from 'react'
import { SafeAreaView, View, Text, Image, StyleSheet} from 'react-native';
import Fire from '../../constants/Fire';
import {FormButton} from '../../components/Reusables'

export default class GameLobby extends React.Component{
  render(){
    return(
      <SafeAreaView style={styles.lobby}>
        <Text style={{fontSize: 50, color: 'white', textAlign: 'center'}}>Game Lobby!</Text>
        <Text style={{fontSize: 20, color: 'white', textAlign: 'center'}}>Waiting for users...</Text>
        {/* this is where a map happens */}
        <View style={styles.user}>
          <Image
          style={styles.userimg}
          source={{uri: "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"}}
          />
          <View style={{marginLeft: 5}}>
          <Text style={{fontSize: 20}}>DISPLAY NAME</Text>
          <Text style={{fontSize: 10}}>MEMER POINTS:</Text>
          </View>
        </View>
        <View style={styles.user}>
          <Image
          style={styles.userimg}
          source={{uri: "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"}}
          />
          <View style={{marginLeft: 5}}>
          <Text style={{fontSize: 20}}>DISPLAY NAME</Text>
          <Text style={{fontSize: 10}}>MEMER POINTS:</Text>
          </View>
        </View>
        <View style={styles.user}>
          <Image
          style={styles.userimg}
          source={{uri: "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"}}
          />
          <View style={{marginLeft: 5}}>
          <Text style={{fontSize: 20}}>DISPLAY NAME</Text>
          <Text style={{fontSize: 10}}>MEMER POINTS:</Text>
          </View>
        </View>
        <FormButton title={'leave game'} style={{marginTop: 'auto'}} colorValue={'white'} modeValue={'contained'} onPress={()=> this.props.navigation.navigate("Welcome")}/>
        <FormButton title={'next panel'} colorValue={'white'} modeValue={'contained'} onPress={()=> this.props.navigation.navigate("MemePresentation")}/>
      </SafeAreaView>
    )
  }
}

const styles=StyleSheet.create({
  lobby:{
    flex: 1,
    backgroundColor: 'blue'

  },
  user:{
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 10
  },
  userimg:{
    borderRadius: 50/2,
    borderWidth: 3,
    borderColor: 'darkred',
    width: 50,
    height:50
  }

})
