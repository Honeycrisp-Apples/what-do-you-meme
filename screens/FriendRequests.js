import React, { useEffect, useState } from 'react';
import { Text, Button, View, Image, ScrollView,  TouchableHighlight  } from 'react-native';
import { AcceptFriendRequest, DeclineFriendRequest } from '../utilities/RecieveFriendRequest';
import Fire from '../constants/Fire';
import firebase from 'firebase';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { LoadingMemer } from './LoadingMemer';
import { FormButton } from '../components/Reusables';
import { TouchableOpacity,} from 'react-native-gesture-handler';

export default function FriendRequests({ navigation }) {
	// const [ me, setme ] = useState();
	const [ value, loading, error ] = useDocument(
		firebase.firestore().collection('users').doc(`${Fire.shared.getUID()}`)
	);
	// const [ myRequests, setmyRequests ] = useState([]);
	// useEffect(() => {
	// 	const callMe = async () => {
	// 		const a = await firebase.firestore().collection('users').doc(`${Fire.shared.getUID()}`).get();
	// 		setme(a);
	// 		console.log(a);
	// 		console.log('Me:', me);
	// 		console.log('B:', a.data());
	// 		const b = await a.data().requests;
	// 		setmyRequests(b);
	// 		// console.log('B:', a.data());
	// 		console.log('My Requests:', myRequests);
	// 	};
	// 	callMe();
	// }, []);
	// const me = firebase.firestore().collection('users').doc(`${Fire.shared.getUID()}`).get();
	// const myRequests = me.data().requests;
	if (error) {
		return <Text>Error: {JSON.stringify(error)}</Text>;
	} else if (loading) {
		// return <Text>Collection: Loading...</Text>;
		return <LoadingMemer/>
	} else if (value) {
		return (
			<View style={{flex: 1, backgroundColor: "lightblue", paddingTop: 20}}>
				<FormButton title="Back to Profile" modeValue={'contained'} colorValue={'blue'} onPress={() => navigation.goBack()} />
			<ScrollView  scrollEnabled={true} contentContainerStyle={{ flex: 1, alignItems: 'center', marginTop: 10}}>
				{value && value.data() && value.data().requests && value.data().requests.length ? (
					value.data().requests.map((req) => (
						<View style={{ backgroundColor: 'blue', width: '90%',height: '30%', flexDirection: 'row', marginBottom: 10, alignItems: "center" }} key={req.userID}>
							<View style={{width: '60%' }}>
								<Image
									source={{ uri: req.picture }}
									style={{
										width: '100%',
										height: '100%',
										marginVertical: 10
									}}
									resizeMode="cover"
									/>
							</View>
							<View style={{flex: 1, height: '100%'}}>
								<Text style={{fontSize: 30, color: 'white', textAlign: 'center', width: '100%', marginTop: 'auto', marginBottom: 'auto'}}>{req.name}</Text>

								<Button style={{backgroundColor: 'green', marginHorizontal: 5, borderRadius: 10, marginBottom: 5}} title={'Accept'} modeValue={'contained'} colorValue={'green'} onPress={() => AcceptFriendRequest(req, value)}>
									<Text style={{fontSize: 20, textAlign: 'center', color: 'white', paddingVertical: 5, }}>Accept</Text>
									</Button>

								<TouchableHighlight style={{backgroundColor: 'white', marginHorizontal: 5, borderRadius: 10, marginBottom: 5}} title={'Decline'} modeValue={'contained'} colorValue={'white'} onPress={() => DeclineFriendRequest(req, value)}>
								<Text style={{fontSize: 20, textAlign: 'center', color: 'black', paddingVertical: 5, }}>Decline</Text>
								</TouchableHighlight>
							</View>
							<View style={{display: "none", backgroundColor: 'green', position: 'absolute'}}>
								<Image
										source={{ uri: req.picture }}
										style={{
											width: '100%',
											height: '100%',
											marginVertical: 10
										}}
										resizeMode="cover"
								/>
								<Text>Accepted</Text>
							</View>
						</View>
					))
				) : (
					<Text style={{marginTop: 50, fontFamily: 'FredokaOne_400Regular' , color: 'white', fontSize: 40, textAlign: 'center'}}>You have no requests, currently.</Text>
				)}
			</ScrollView>
			</View>
		);
	}
}
