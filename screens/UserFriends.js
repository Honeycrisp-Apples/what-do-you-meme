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
			<SafeAreaView style={{flex: 1}}>
				<View
				style={{backgroundColor: 'rgb(0, 122, 255)',
				padding: 20,
				borderRadius: 20,
				flexDirection: 'row',
				justifyContent: 'flex-start',
				margin: 20, marginTop: 0}}>
					<Text style={{width: '100%', fontFamily: 'FredokaOne_400Regular' , color: 'white', fontSize: 50, textAlign: 'center'}}>YOUR FRIENDS</Text>
				</View>
				<ScrollView contentContainerStyle={styles.friends}>
					{value.data().friends.length && valueC ? (
						value.data().friends.map((friend, index) => {
							//find cleaner way to do this... maybe useEffect?
							// const found = valueC.docs.filter((doc) => doc.id === friend.userId)[0];
							// console.log('Found?:', found?.data().imageURL);

							return (
								<View key={index} style={styles.friendCont}>
									<Image
										style={styles.img}
										// source={require('../assets/images/icon.png')}
										source={{ uri: `${friend.imageURL}` }}
									/>
									{/* change imageurl to avatar above ^^^^^^ */}
									<View style={{ marginTop: 10, height: 30, paddingHorizontal: 5, borderRadius: 5, backgroundColor: 'blue'}}>

									<Text
										style={{
											marginTop: 5,
											color: 'white',
											textAlign: 'center'
										}}
										>
										{`${friend.displayName}`}
									</Text>
										</View>
								</View>
							);
						})
					) : (
						// <View>

							<Text style={{fontFamily: 'FredokaOne_400Regular' , color: '#c1c1c1', fontSize: 40, textAlign: 'center'}}>Such a sad and lonely road... Let&apos;s change that by playing some games!</Text>
					//  </View>
					)}
				</ScrollView>
				{/* <FormButton
					modeValue={'contained'}
					title={'Search for Friends!'}
					onPress={() => navigation.navigate('SearchFriends')}
				/> */}
				<View style={{marginTop: "auto"}}>

				<FormButton
					colorValue={"blue"}
					modeValue={'contained'}
					title={'Check for Friend Requests'}
					onPress={() => navigation.navigate('FriendRequests')}
				/>
				</View>
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
