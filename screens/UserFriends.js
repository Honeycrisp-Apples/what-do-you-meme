import React from 'react';
import { Text, SafeAreaView, Button, StyleSheet, View, Image, ScrollView } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { FormButton } from '../components/Reusables';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import Fire from '../constants/Fire';
import firebase from 'firebase';
export default function UserFriends({ navigation }) {
	// static navigationOptions = ({navigation}) => {
	//   return({
	//     title: 'Friends',
	//     headerStyle: {
	//       backgroundColor: 'darkred'
	//     },
	//     headerTintColor: '#ffffff',
	//     headerTitleStyle: {
	//       fontSize: 22
	//     },
	//     headerLeft: () => {
	//       // <IconButton
	//       // icon='message-plus'
	//       // size={28}
	//       // color='#ffffff'
	//       // onPress={() => navigation.navigate('UserMain')}
	//       // />
	//     }
	//   })
	// };

	// `${valueC.docs.filter(doc => doc.id === friend).data().imageURL}'
	// {`${valueC.docs.filter(doc => doc.id === friend).data().displayName}`}
	const [ value, loading, error ] = useDocument(
		firebase.firestore().collection('users').doc(`${Fire.shared.getUID()}`)
	);

	const [ valueC, lC, eC ] = useCollection(firebase.firestore().collection('users'), {
		snapshotListenOptions: { includeMetadataChanges: true }
	});

	if (error) {
		return <Text>Error: {JSON.stringify(error)}</Text>;
	} else if (loading && lC) {
		return <Text>Collection: Loading...</Text>;
	} else if (value) {
		return (
			<SafeAreaView>
				<ScrollView contentContainerStyle={styles.friends}>
					{value.data().friends.length && valueC ? (
						value.data().friends.map((friend, index) => {
							//find cleaner way to do this... maybe useEffect?
							// const found = valueC.docs.filter((doc) => doc.id === friend.userId)[0];
							// console.log('Found?:', found?.data().imageURL);
							{
								/* change imageurl to avatar above   ^^^^^^ */
							}

							return (
								<View key={index} style={styles.friendCont}>
									<Image
										style={styles.img}
										// source={require('../assets/images/icon.png')}
										source={{ uri: `${friend.imageURL}` }}
									/>
									{/* change imageurl to avatar above ^^^^^^ */}

									<Text
										style={{
											marginTop: 5,
											color: 'orange',
											textAlign: 'center'
										}}
									>
										{`${friend.displayName}`}
									</Text>
								</View>
							);
						})
					) : (
						<Text>Such a sad and lonely road... Let&apos;s change that!</Text>
					)}
					{/* <View style={styles.friendCont}>
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
            </View> */}
				</ScrollView>
				<FormButton
					modeValue={'contained'}
					title={'Search for Friends!'}
					onPress={() => navigation.navigate('SearchFriends')}
				/>
				<FormButton
					modeValue={'contained'}
					title={'Check for Friend Requests'}
					onPress={() => navigation.navigate('FriendRequests')}
				/>
				{/* <FormButton
          modeValue={'contained'}
          title={'To UserMain'}
          onPress={()=> this.props.navigation.navigate("UserMain")}
          />
          <FormButton
          modeValue={'contained'}
          title={'To Awards'}
          onPress={()=> this.props.navigation.navigate("UserAwards")}
          /> */}
				{/* <Button
          title={'To Friends'}
          onPress={()=> this.props.navigation.navigate("UserFriends")}
          ></Button> */}
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	card: {
		marginTop: 50,
		marginHorizontal: 5,
		// borderTopEndRadius: 10,
		flex: 1,
		flexGrow: 1
	},
	friends: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		// alignItems: 'center',
		margin: 20
	},
	friendCont: {
		// backgroundColor: 'blue',
		margin: 10
	},
	img: {
		borderRadius: 100 / 2,
		borderWidth: 3,
		borderColor: 'darkred',
		width: 100,
		height: 100
	}
});
