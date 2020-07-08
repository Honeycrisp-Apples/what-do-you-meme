import React from 'react';
import {
  Text,
  SafeAreaView,
  Button,
  View,
  Image,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import firebase from 'firebase';
import Fire from '../constants/Fire'

export default function UserAwards() {
  // refactor using object id
  const [value, loading, error] = useDocument(
    firebase.firestore().collection('users').doc(`${Fire.shared.getUID()}`)
  );
  if(error){
    return <Text>Error: {JSON.stringify(error)}</Text>
  } else if (loading){
    return <Text>Collection: Loading...</Text>
  } else if (value){
  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          {value &&
            value.data().awards.map((award) => (
              <View key={award + 'view'}>
                <View
                  style={{
                    margin: 10,
                    padding: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: '#8B0000',
                    borderStyle: 'solid',
                    shadowColor: '#000000',
                    shadowOpacity: 0.5,
                    shadowRadius: 2,
                    shadowOffset: {
                      height: 1,
                      width: 1,
                    },
                  }}
                >
                  <Text>{award.title}</Text>
                  <Image
                    source={{ uri: award.icon }}
                    style={{
                      flex: 1,
                      width: 150,
                      height: 100,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text>{award.descrip}</Text>
                  <Text>{award.points} points needed</Text>
                </View>
              </View>
            ))}
        </View>

        {/* <Text>Hi there!!!</Text> */}
        <Button
          title={'To UserMain'}
          onPress={() => this.props.navigation.navigate('UserMain')}
        ></Button>
        <Button
          title={'To Friends'}
          onPress={() => this.props.navigation.navigate('UserFriends')}
        ></Button>
        {/* <Button
        title={'To Friends'}
        onPress={()=> this.props.navigation.navigate("UserFriends")}
        ></Button> */}
      </ScrollView>
    </SafeAreaView>
  )
      }
}
