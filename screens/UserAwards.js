import React from 'react';
import { Text, SafeAreaView, Button, View } from 'react-native';
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
        console.log('data', data.data.fields.awards.arrayValue.values);
        this.setState({ awards: data.data.fields.awards.arrayValue.values });
      });
  }
  render() {
    // const users = this.props.users;
    // console.log('users', users);
    return (
      <SafeAreaView>
        <View>
          <Text>
            {this.state.awards.map((award) => (
              <Text key={award.mapValue}>
                {award.mapValue.fields.title.stringValue}
                {award.mapValue.fields.descrip.stringValue}
                {award.mapValue.fields.points.integerValue} points needed
              </Text>
            ))}
          </Text>
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
      </SafeAreaView>
    );
  }
}
