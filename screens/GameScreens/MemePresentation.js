import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet } from 'react-native';
import Fire from '../../constants/Fire';
import { FormButton } from '../../components/Reusables';

export default class MemePresentation extends React.Component {
  // componentDidMount(){
  //   setTimeout(() => {
  //     this.props.navigation.navigate('CaptionInput');
  //  }, 2500);
  // }


  constructor(props){
    super(props)
    this.state={
      display: 'none'
    }
  }

  componentDidMount(){
    setTimeout(() => {
      // this.props.navigation.navigate('CaptionInput');
      this.setState({display: 'flex'})
   }, 2500);
  }

  render(){
    return(
    <SafeAreaView style={{backgroundColor: 'darkred', flex:1}}>
      <Text style={{fontSize: 50, color: 'white', textAlign: 'center'}}>ROUND 1</Text>
      <Text style={{fontSize: 20, color: 'white', textAlign: 'center', marginBottom: 10}}>Here we go...</Text>
      <View style={{justifyContent: 'flex-end' ,alignItems: 'center'}}>
      <Image
      style={styles.memeimg}
      source={{uri: "https://vignette.wikia.nocookie.net/starwars/images/d/d6/Yoda_SWSB.png/revision/latest?cb=20150206140125"}}
      />
      <View style={{display:`${this.state.display}` ,position: 'absolute',alignSelf: "flex-end",flexDirection: 'row', justifyContent:'flex-end' ,alignItems: 'center'}}>
        <View style={{backgroundColor:"gold", height: 60, width: 60, borderRadius: 30, justifyContent:'center', marginRight: 30}}>
        <Text style={{color: 'white', textAlign: 'center', fontSize: 25}}>G0!</Text>
        </View>
      </View>
      </View>
      <View style={styles.players}>
        <Image
        style={styles.img}
        source={{uri: "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"}}
        />
        <Image
        style={styles.img}
        source={{uri: "https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"}}
        />
      </View>
      <FormButton title={'next page'} colorValue={'white'} modeValue={'contained'} onPress={()=>this.props.navigation.navigate('CaptionInput')}/>
    </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  memeimg:{
    width: 300,
    height:300,
    borderWidth: 3,
    borderColor: 'gold',
  },
  players:{
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  img:{
    margin: 5,
    borderRadius: 100/2,
    borderWidth: 3,
    borderColor: 'darkred',
    width: 100,
    height:100
  }
})

