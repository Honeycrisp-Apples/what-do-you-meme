import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, Button } from 'react-native';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';
import Fire from '../constants/Fire';
import SendFriendRequest from '../utilities/SendFriendRequest';

export default function SearchFriends() {
	const [ value, loading, error ] = useDocument(
		firebase.firestore().collection('users').doc(`${Fire.shared.getUID()}`)
	);

	// const [ valueC, lC, eC ] = useCollection(firebase.firestore().collection('users'), {
	//  snapshotListenOptions: { includeMetadataChanges: true }
	// });

	const [ s, setS ] = useState('');
	const [ results, setResults ] = useState([]);
	const [ selected, setSelected ] = useState({});
	const navigation = useNavigation();

	// const [ state, setState ] = useState({
	//  s: 'Search for Friends!',
	//  results: [],
	//  selected: {}
	// });

	const search = async () => {
		await firebase.firestore().collection('users').where('displayName', '==', `${s}`).get().then(async (query) => {
			// console.log('Data:', data);
			let results = query.docs;
			console.log('Results:', results);
			setResults(results);
		});
		// //   // &s= is a query paramater
		// //   users + '&s=' + s
		// // )
		// // let searchValues = users + '&s=' + s;
		// console.log('Users:', users);

		// users.then(async (data) => {
		// 	console.log('Data:', data);
		// 	let results = await data.Search;
		// 	console.log('Results:', results);
		// 	setResults(results);
		// });
	};

	if (error) {
		return <Text>Error: {JSON.stringify(error)}</Text>;
	} else if (loading) {
		return <Text>Collection: Loading...</Text>;
	} else if (value) {
		return (
			<View style={styles.container}>
				<Button title="Go to UserMain" onPress={() => navigation.navigate('UserMain')} />
				<Text style={styles.title}>Users</Text>
				<TextInput
					placeholder={'Search for Friends!'}
					style={styles.searchbox}
					onChangeText={(text) => setS(text)}
					onSubmitEditing={search}
					value={s}
				/>

				<ScrollView style={styles.results}>
					{results && results.length ? (
						results.map((result) => (
							<View key={result.ref.id} style={styles.result} onPress={SendFriendRequest(result, value)}>
								<Image
									source={{ uri: result.data().avatar }}
									style={{
										width: '100%',
										height: 300
									}}
									resizeMode="cover"
								/>
								<Text style={styles.heading}>{result.data().displayName}</Text>
							</View>
						))
					) : null}
				</ScrollView>
				<StatusBar style="auto" />
			</View>
		);
	}
}

//feel free to change styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#223343',
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingTop: 70,
		paddingHorizontal: 20
	},
	title: {
		color: '#fff',
		fontSize: 32,
		fontWeight: '700',
		textAlign: 'center',
		marginBottom: 20
	},
	searchbox: {
		fontSize: 20,
		fontWeight: '300',
		padding: 20,
		width: '100%',
		backgroundColor: '#fff',
		borderRadius: 8,
		marginBottom: 40
	},
	results: {
		flex: 1
	},
	result: {
		flex: 1,
		width: '100%',
		marginBottom: 20
	},
	heading: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '700',
		padding: 20,
		backgroundColor: '#445565'
	}
});
