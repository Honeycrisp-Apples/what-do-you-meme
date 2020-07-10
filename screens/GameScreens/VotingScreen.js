import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet } from 'react-native';
import Fire from '../../constants/Fire';
import { FormButton } from '../../components/Reusables';

export default class VotingScreen extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      count: 10
    }
  }
  componentDidMount(){
    let myvar1;
    const change = () => {
      if(this.state.count>0){
        this.setState({count: this.state.count-1})
      }else {
        clearInterval(myvar1)
        console.log('leaving to vote')
        // return this.props.navigation.navigate("RoundResults")
      }
    }
    myvar1 = setInterval(()=>change(), 1000)
  }

  render(){
    return (
      <SafeAreaView>
        <Text>VotingScreen</Text>
        <Text>Time until next navigation: {this.state.count}</Text>
        <FormButton title={'game lobby'} colorValue={'white'} modeValue={'contained'} onPress={()=> this.props.navigation.navigate("GameLobby")}/>
        <FormButton title={'next page'} colorValue={'white'} modeValue={'contained'} onPress={()=>this.props.navigation.navigate('RoundResults')}/>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({});
