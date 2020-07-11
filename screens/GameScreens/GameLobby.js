import React from 'react';
import { SafeAreaView, View, Text, Image, StyleSheet } from 'react-native';
import Fire from '../../constants/Fire';
import { FormButton } from '../../components/Reusables';
import * as firebase from 'firebase';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';

export default function GameLobby({ navigation, route }) {
  // getGames() {
  //   firebase.firestore.collection('games');
  // }
  //sorting can happen to pass appropriate game to the next page; certain boxes are dependent on user array on game object
  // const [value, loading, error] = useDocument(
  //   firebase.firestore().collection('game').doc('PReC4ht5CcZFvI3cYEnP'),
  //   {
  //     snapshotListenOptions: { includeMetadataChanges: true },
  //   }
  // );
  // if (error) {
  //   return <Text>Error: {JSON.stringify(error)}</Text>;
  // } else if (loading) {
  //   return <Text>Collection: Loading...</Text>;
  // } else if (value) {
  //   console.log('value', value.data());
  console.log('navigation', route);
  return (
    <SafeAreaView style={styles.lobby}>
      <Text style={{ color: 'white' }}>
        Number of Players: {route.params.theGame.data().numUsers}
      </Text>
      <Text style={{ fontSize: 50, color: 'white', textAlign: 'center' }}>
        Game Lobby!
      </Text>
      <Text style={{ fontSize: 20, color: 'white', textAlign: 'center' }}>
        Waiting for users...
      </Text>
      {/* this is where a map happens */}
      <View style={styles.user}>
        <Image
          style={styles.userimg}
          source={{
            uri:
              'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg',
          }}
        />
        <View style={{ marginLeft: 5 }}>
          <Text style={{ fontSize: 20 }}>DISPLAY NAME</Text>
          <Text style={{ fontSize: 10 }}>MEMER POINTS:</Text>
        </View>
      </View>
      <View style={styles.user}>
        <Image
          style={styles.userimg}
          source={{
            uri:
              'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg',
          }}
        />
        <View style={{ marginLeft: 5 }}>
          <Text style={{ fontSize: 20 }}>DISPLAY NAME</Text>
          <Text style={{ fontSize: 10 }}>MEMER POINTS:</Text>
        </View>
      </View>
      <View style={styles.user}>
        <Image
          style={styles.userimg}
          source={{
            uri:
              'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg',
          }}
        />
        <View style={{ marginLeft: 5 }}>
          <Text style={{ fontSize: 20 }}>DISPLAY NAME</Text>
          <Text style={{ fontSize: 10 }}>MEMER POINTS:</Text>
        </View>
      </View>
      <FormButton
        title={'leave game'}
        style={{ marginTop: 'auto' }}
        colorValue={'white'}
        modeValue={'contained'}
        onPress={() => this.props.navigation.navigate('Welcome')}
      />
      <FormButton
        title={'next panel'}
        colorValue={'white'}
        modeValue={'contained'}
        onPress={() => this.props.navigation.navigate('MemePresentation')}
      />
    </SafeAreaView>
  );
}
// }

const styles = StyleSheet.create({
  lobby: {
    flex: 1,
    backgroundColor: 'blue',
  },
  user: {
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 10,
  },
  userimg: {
    borderRadius: 50 / 2,
    borderWidth: 3,
    borderColor: 'darkred',
    width: 50,
    height: 50,
  },
});
