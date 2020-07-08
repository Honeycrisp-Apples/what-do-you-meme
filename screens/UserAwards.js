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

export default class UserAwards extends React.Component {
  constructor() {
    super();
    this.state = {
      awards: [],
    };
  }
  componentDidMount() {
    axios
      .get(
        `https://firestore.googleapis.com/v1/projects/memer-365/databases/(default)/documents/users/Luigi`
      )
      .then((data) => {
        console.log('data', data);
        this.setState({ awards: data.data.fields.awards.arrayValue.values });
      });
  }
  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <View>
            {this.state.awards.map((award) => (
              <View key={award.mapValue + 'view'}>
                <View
                  key={award.mapValue + 'text'}
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
                  <Text>{award.mapValue.fields.title.stringValue}</Text>
                  <Image
                    source={{ uri: award.mapValue.fields.icon.stringValue }}
                    style={{
                      flex: 1,
                      width: 150,
                      height: 100,
                      resizeMode: 'contain',
                    }}
                  />
                  <Text>{award.mapValue.fields.descrip.stringValue}</Text>
                  <Text>
                    {award.mapValue.fields.points.integerValue} points needed
                  </Text>
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
    );
  }
}
