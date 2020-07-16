import React, { useEffect, useState } from 'react';
import { Text, Button, View, Image } from 'react-native';
import { RecieveFriendRequests, DeclineFriendRequest } from '../utilities/RecieveFriendRequest';
import Fire from '../constants/Fire';
import firebase from 'firebase';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';

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
		return <Text>Collection: Loading...</Text>;
	} else if (value) {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Button title="Go to UserMain" onPress={() => navigation.navigate('UserMain')} />
				{value && value.data() && value.data().requests && value.data().requests.length ? (
					value.data().requests.map((req) => (
						<View style={{ backgroundColor: 'blue', width: '100%' }}>
							<Image
								source={{ uri: req.picture }}
								style={{
									width: '100%',
									height: 300
								}}
								resizeMode="cover"
							/>
							<Text> {req.name}</Text>
							<Button title={'Accept'} />
							<Button title={'Decline'} onPress={() => DeclineFriendRequest(req, value)} />
						</View>
					))
				) : (
					<Text>There are no requests</Text>
				)}
			</View>
		);
	}
}
