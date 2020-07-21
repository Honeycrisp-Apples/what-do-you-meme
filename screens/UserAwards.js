import React, {useEffect} from 'react';
import {
  Text,
  SafeAreaView,
  Button,
  View,
  Image,
  ScrollView, StyleSheet
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

  useEffect(()=> {
    unlock()
  }, [])

  const unlock = async () => {
    if(value && value.data()){
      let aCopy = value.data().awards
      await aCopy.forEach(async (a, ind)=> {
        if(value.data().points >= a.points){
          aCopy[ind].unlocked = true
        }
      })
      console.log("Copy: ", aCopy)
      await value.ref.update({
        awards: aCopy
      })
    }
  }

  if(error){
    return <Text>Error: {JSON.stringify(error)}</Text>
  } else if (loading){
    return <Text>Collection: Loading...</Text>
  } else if (value){
    unlock()
  return (
    <View style={{flex: 1, backgroundColor: 'rgb(0, 122, 255)'}}>
      <View style={{backgroundColor: 'white',
		padding: 20,
		borderRadius: 20,
		flexDirection: 'row',
		justifyContent: 'center',
		margin: 20}}>
					<Text style={{ fontFamily: 'FredokaOne_400Regular' , color:  'rgb(0, 122, 255)', fontSize: 50, textAlign: 'center'}}>AWARDS</Text>
				</View>

    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1}}>
        <View>
          {value &&
            value.data().awards.map((award, index) => (
              <View key={index}>
                <View
                style=
                  {
                    (award.unlocked) ? (
                    [styles.awardbox, styles.unlocked]
                    ): (
                    [styles.awardbox, styles.locked]
                    )
                  }
                >
                  <Image
                    source={{ uri: award.icon }}
                    style={{
                      // flex: 1,
                      width: 150,
                      height: 100,
                      resizeMode: 'contain',
                    }}
                    />
                  <View style={{flex:1, flexWrap: 'wrap' , alignItems: 'center'}}>
                    <Text style={{fontFamily:
                    "FredokaOne_400Regular", fontSize: 20}}>{award.title}</Text>
                    <Text style={{textAlign: 'center'}}>{award.descrip}</Text>
                    <Text>{award.points} points needed</Text>
                  </View>
                </View>
              </View>
            ))}
        </View>

        {/* <Text>Hi there!!!</Text> */}
        {/* <Button
          title={'To UserMain'}
          onPress={() => this.props.navigation.navigate('UserMain')}
        ></Button>
        <Button
          title={'To Friends'}
          onPress={() => this.props.navigation.navigate('UserFriends')}
        ></Button> */}
        {/* <Button
        title={'To Friends'}
        onPress={()=> this.props.navigation.navigate("UserFriends")}
        ></Button> */}
      </ScrollView>
    </SafeAreaView>
    </View>
  )
      }
}

const styles = StyleSheet.create({
  awardbox: {
      backgroundColor: 'white',
      borderRadius: 10,
      margin: 10,
      padding: 10,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'blue',
      borderStyle: 'solid',
      shadowColor: '#000000',
      shadowOpacity: 0.5,
      shadowRadius: 2,
      shadowOffset: {
        height: 1,
        width: 1,
      },
  },
  unlocked: {
    opacity: 1
  },
  locked: {
    opacity: .3
  }
})
