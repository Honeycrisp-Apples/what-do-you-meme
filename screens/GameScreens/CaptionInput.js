import React from 'react'
import { SafeAreaView, View, Text, Image, StyleSheet} from 'react-native';
import Fire from '../../constants/Fire';
import {FormButton} from '../../components/Reusables'

export default class CaptionInput extends React.Component {


  render(){
    return(
      <SafeAreaView>
        <Text>CaptionInput</Text>
        <FormButton title={'game lobby'} onPress={()=> this.props.navigation.navigate("GameLobby")}/>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({

})
