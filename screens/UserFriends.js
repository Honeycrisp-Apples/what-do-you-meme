import React from 'react'
import {Text, SafeAreaView, Button, StyleSheet, View, Image, ScrollView} from 'react-native'
import {Card,  IconButton} from 'react-native-paper'
import {FormButton} from '../components/Reusables'

export default class UserFriends extends React.Component{
  static navigationOptions = ({navigation}) => {
    return({
      title: 'Friends',
      headerStyle: {
        backgroundColor: 'darkred'
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontSize: 22
      },
      headerLeft: () => {
        // <IconButton
        // icon='message-plus'
        // size={28}
        // color='#ffffff'
        // onPress={() => navigation.navigate('UserMain')}
        // />
      }
    })
  };
  render(){
    return (
      <SafeAreaView>
        <ScrollView contentContainerStyle={styles.friends}>
          <View style={styles.friendCont}>
            <Image
            style={styles.img}
            source={require('../assets/images/icon.png')}
            />
            <Text style={{marginTop: 5, color: 'orange'}}>FRIEND NAME</Text>
          </View>
          <View style={styles.friendCont}>
            <Image
            style={styles.img}
            source={require('../assets/images/icon.png')}
            />
            <Text style={{marginTop: 5, color: 'orange'}}>FRIEND NAME</Text>
          </View>
          <View style={styles.friendCont}>
            <Image
            style={styles.img}
            source={require('../assets/images/icon.png')}
            />
            <Text style={{marginTop: 5, color: 'orange'}}>FRIEND NAME</Text>
          </View>
          <View style={styles.friendCont}>
            <Image
            style={styles.img}
            source={require('../assets/images/icon.png')}
            />
            <Text style={{marginTop: 5, color: 'orange'}}>FRIEND NAME</Text>
          </View>
          <View style={styles.friendCont}>
            <Image
            style={styles.img}
            source={require('../assets/images/icon.png')}
            />
            <Text style={{marginTop: 5, color: 'orange'}}>FRIEND NAME</Text>
          </View>
          <View style={styles.friendCont}>
            <Image
            style={styles.img}
            source={require('../assets/images/icon.png')}
            />
            <Text style={{marginTop: 5, color: 'orange'}}>FRIEND NAME</Text>
          </View>
        </ScrollView>
        <FormButton
        modeValue={'contained'}
        title={'Add Friend'}
        onPress={()=> alert('Page not made yet!')}
        />
        <FormButton
        modeValue={'contained'}
        title={'To UserMain'}
        onPress={()=> this.props.navigation.navigate("UserMain")}
        />
        <FormButton
        modeValue={'contained'}
        title={'To Awards'}
        onPress={()=> this.props.navigation.navigate("UserAwards")}
        />
        {/* <Button
        title={'To Friends'}
        onPress={()=> this.props.navigation.navigate("UserFriends")}
        ></Button> */}
      </SafeAreaView>
      )
  }
}

const styles = StyleSheet.create({
  card: {
    marginTop: 50,
    marginHorizontal:5,
    // borderTopEndRadius: 10,
    flex:1,
    flexGrow:1
  },
  friends: {
    flexDirection:'row', flexWrap:'wrap',
    justifyContent: "center",
    // alignItems: 'center',
    margin: 20
  },
  friendCont:{
    // backgroundColor: 'blue',
    margin: 10
  },
  img:{
    borderRadius: 100/2,
    borderWidth: 3,
    borderColor: 'darkred',
    width: 100,
    height:100
  },
})
