import React from 'react';

import { SafeAreaView, Text, Button } from 'react-native';
import Fire from '../constants/Fire';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from 'firebase';

// type Props = {
//   navigation: { navigate: (arg0: string) => void, state: {params: {username? : string}} },
//   username?: string
// }
// interface AState {
//   user: any,
//   ready: boolean
// }

export default function Welcome(props) {
  // state = {
  //   // user: this.props.navigation.state.params.username
  //   user: Fire.shared.getUser(),
  //   ready: false
  // }
  // componentDidMount(){
  //   this.setState({
  //     user: Fire.shared.getUser()
  //   })
  // }
  // componentWillUpdate(){
  //   this.setState({ready:true})
  // }
  const getout = () => {
    Fire.shared.logout();
    props.navigation.navigate('Login');
    // this.props.navigation.navigate("TabOneNavigator")
    // console.log(this.state.user)
    console.log('logged out. Did navigation happen?');
  };
  // render(){
  const [user, loading, error] = useAuthState(firebase.auth());
  if (loading) {
    return <Text>I'm loading</Text>;
  }
  if (error) {
    return <Text>You Messed Up!!</Text>;
  }
  if (user) {
    return (
      <SafeAreaView>
        <Text>{`Hello there, ${user.displayName}`}</Text>
        <Button title={'LOGOUT'} onPress={() => getout()}></Button>
        <Button
          title={'To User'}
          onPress={() => props.navigation.navigate('UserPages')}
        ></Button>
        <Button
          title={'To Game'}
          onPress={() => props.navigation.navigate('GameLobby')}
        ></Button>
      </SafeAreaView>
    );
  }
  return <Text>Umm... how?</Text>;
  // }
}
