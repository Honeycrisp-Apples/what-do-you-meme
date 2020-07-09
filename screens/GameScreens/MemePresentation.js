import React from 'react'
import { SafeAreaView, View, Text, Image, StyleSheet} from 'react-native';
import Fire from '../../constants/Fire';
import {FormButton} from '../../components/Reusables'

export default class MemePresentation extends React.Component {

  componentDidMount(){
    setTimeout(() => {
      this.props.navigation.navigate('CaptionInput');
   }, 2500);
  }

  render(){
    return(
    <SafeAreaView>
      <Text>Next Meme is...</Text>
      <Image
      source={{uri: "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"}}
      />
      <FormButton title={'next page'}/>
    </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({

})
