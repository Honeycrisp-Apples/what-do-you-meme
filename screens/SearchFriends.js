import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, Button, Keyboard } from 'react-native';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase';
import Fire from '../constants/Fire';
import SendFriendRequest from '../utilities/SendFriendRequest';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { Searchbar } from 'react-native-paper';
import {SearchBar} from 'react-native-elements'

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
	const [ allUsers, setAllUsers ] = useState();
	const navigation = useNavigation();

	// const [ state, setState ] = useState({
	//  s: 'Search for Friends!',
	//  results: [],
	//  selected: {}
	// });

	useEffect(()=>{
		const callMe = async () => {
			let a = await firebase.firestore().collection('users').get()
			await setAllUsers(a.docs)
			console.log(a.docs)
			console.log("allUsers:", allUsers)
		}
		callMe()
	}, [])

	const search = async () => {
		// await firebase.firestore().collection('users').where('displayName', '==', `${s}`).get().then(async (query) => {
		// 	// console.log('Data:', data);
		// 	let results = query.docs;
		// 	console.log('Results:', results);
		// 	await setResults(results);
		// });
		let results = allUsers.filter((user)=> {
			console.log("S: ", s)
			return user.data().displayName.includes(s)
		})
		console.log('Results:', results);
		setResults(results);
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
			<ScrollView contentContainerStyle={styles.container}onPress={Keyboard.dismiss}>
				<Button title="Go to UserMain" onPress={() => navigation.navigate('UserMain')} />
				<Text style={styles.title}>Users</Text>
				{/* <TextInput
					placeholder={'Search for Friends!'}
					style={styles.searchbox}
					onChangeText={(text) => setS(text)}
					// returnKeyType='FIND'
					// onSubmitEditing={search}
					value={s}
				/> */}
				<Searchbar
					placeholder="Type Here..."
					lightTheme
					round
					value={s}
					// clearIcon="close"
					iconColor="orange"
					// showCancel
					onChangeText={text => {setS(text)}}
					onSubmitEditing={()=>search()}
					// onChangeText={text => this.searchFilterFunction(text)}
					autoCorrect={false}
				/>
				{/* <SearchBar
					platform="ios"
					inputStyle={{backgroundColor: 'white'}}
					inputContainerStyle={{backgroundColor: 'white'}}
					containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
					placeholder="Type Here..."
					lightTheme
					// round
					showCancel
					// showLoading
					value={s}
					onChangeText={text => {setS(text)}}
					onSubmitEditing={()=>search()}
					autoCorrect={false}
				/> */}
				<TouchableHighlight onPress={search}>
        <Text>Press this button to submit editing</Text>
      	</TouchableHighlight>
				<ScrollView contentContainerStyle={styles.results} >
					{results && results.length ? (
						results.map((result) => (
							<View key={result.ref.id} style={styles.result} onPress={SendFriendRequest(result, value)}>
								<Image
									source={{ uri: result.data().imageURL}}
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
			</ScrollView>
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
		marginBottom: 40,
		color: "black"
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
