import React from 'react'
import {Text, SafeAreaView, Button, StyleSheet, ScrollView, Image, View, Dimensions} from 'react-native'
import {Card, IconButton} from 'react-native-paper'
// import Hr from 'react-native-hr-component'
import {FormButton, FormInut} from '../components/Reusables'
import { TouchableOpacity } from 'react-native-gesture-handler';
const { width, height } = Dimensions.get('screen');
export default class UserMain extends React.Component{
  static navigationOptions = ({navigation}) => {
    return({
      // title: 'Create Your Character',
      headerShown: false
      // title: "tester2"
    })
  };

  render(){
    return (
    <SafeAreaView style={styles.background}>
      <IconButton
        style={{marginLeft: 'auto', position: 'absolute',
        top: 10,
        right: 0,
        zIndex: 1}}
        icon='close-circle'
        size={36}
        color='orange'
        onPress={() => this.props.navigation.goBack(this.props.navigation.state.key)}
      />
      <ScrollView contentContainerStyle={{flex: 1}}>
        <Card style={styles.card}>
          <View style={styles.topPart}>
            <View style={styles.imgCont}>
              <Image
              style={styles.img}
              source={require('../assets/images/icon.png')}
              />
              <TouchableOpacity style={{marginTop: 5}}>
                <Text style={{fontSize: 10, textAlign: 'center', color: 'darkred'}}>Change Picture</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.nameCont}>
              {/* <Text>Hi there!!!</Text> */}
              <Text style={{fontSize: 24, fontWeight: 'bold'}}>DISPLAYNAME</Text>
              <Text style={{fontSize: 16}}>Memer Points: </Text>
            </View>
          </View>

          <View>
          {/* <Hr lineColor='red' text='line style and text style'
            lineStyle={{
                backgroundColor: "blue",
                height: 2
            }}
            textStyle={{
                color: "green",
                fontSize: 20,
                textDecorationLine: "underline",
                textDecorationStyle: "solid",
                textDecorationColor: "#000"
            }}
          /> */}
            <View style={styles.underlined}>

            <Text style={{fontSize: 16, marginBottom: 3}}>Earned Memes: </Text>
            </View>

            <View style={styles.memeCont}>
              <Image
                style={styles.memes}
                source={require('../assets/images/icon.png')}
              />
              <Image
                style={styles.memes}
                source={require('../assets/images/icon.png')}
              />
              <Image
                style={styles.memes}
                source={require('../assets/images/icon.png')}
              />
              <Image
                style={styles.memes}
                source={require('../assets/images/icon.png')}
              />
              <Image
                style={styles.memes}
                source={require('../assets/images/icon.png')}
              />
            </View>

          </View>

          <FormButton
          title={'To Awards'}
          modeValue={'contained'}
          onPress={()=> this.props.navigation.navigate("UserAwards")}
          />
          <FormButton
          title={'To Friends'}
          modeValue={'contained'}
          onPress={()=> this.props.navigation.navigate("UserFriends")}
          />
          <FormButton
          title={'To Welcome'}
          modeValue={'contained'}
          onPress={()=> this.props.navigation.navigate("Welcome")}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  background:{
    backgroundColor: 'darkred',
    flex: 1
  },
  card: {
    marginTop: 50,
    marginHorizontal:5,
    // borderTopEndRadius: 10,
    flex:1,
    flexGrow:1
  },
  topPart: {
    // flex:1,
    flexDirection: 'row',
    justifyContent: "flex-start",
    margin: 20
  },
  imgCont: {
    marginRight: 10
  },
  img: {
    borderRadius: 100/2,
    borderWidth: 3,
    borderColor: 'darkred',
    width: 100,
    height:100
  },
  nameCont: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  underlined: {
    // borderWidth: 10,
    // height: 50,
    borderBottomColor: 'darkred',
    // borderEndWidth: 10,
    borderBottomWidth: 3,
    marginHorizontal: 24
  },
  memeCont: {
    marginHorizontal: 24,
    flexDirection:'row', flexWrap:'wrap',
    // justifyContent: 'space-around'
  },
  memes:{
    height: width / 3.5 - 5,
    width: width / 3.5 - 5,
    // marginHorizontal: 5
    marginVertical: 5,
    // display: 'inline'
    marginRight: 5,
  }
})
