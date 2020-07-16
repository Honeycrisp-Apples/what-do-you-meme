import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, TextInput, ScrollView, Image, Button } from 'react-native';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import firebase from 'firebase';
import Fire from '../constants/Fire';

export default function SearchFriends() {
	const [ value, loading, error ] = useDocument(
		firebase.firestore().collection('users').doc(`${Fire.shared.getUID()}`)
	);

	const [ valueC, lC, eC ] = useCollection(firebase.firestore().collection('users'), {
		snapshotListenOptions: { includeMetadataChanges: true }
	});

	const [ state, setState ] = useState({
		s: 'Search for Friends!',
		results: [],
		selected: {}
	});

	const search = () => {
		// &s= is a query paramater
		axios(apiurl + '&s=' + state.s).then(({ data }) => {
			let results = data.Search;
			console.log(results);
			setState((prevState) => {
				return { ...prevState, results: results };
			});
		});
	};

	if (error) {
		return <Text>Error: {JSON.stringify(error)}</Text>;
	} else if (loading && lC) {
		return <Text>Collection: Loading...</Text>;
	} else if (value) {
		return (
			<View style={styles.container}>
				<Button title="Go to UserMain" onPress={() => navigation.navigate('UserMain')} />
				<Text style={styles.title}>Users</Text>
				<TextInput
					style={styles.searchbox}
					onChangeText={(text) =>
						setState((prevState) => {
							return { ...prevState, s: text };
						})}
					onSubmitEditing={search}
					value={state.s}
				/>

				<ScrollView style={styles.results}>
					{state.results.map((result) => (
						<View key={result.imdbID} style={styles.result}>
							<Image
								source={{ uri: result.Poster }}
								style={{
									width: '100%',
									height: 300
								}}
								resizeMode="cover"
							/>
							<Text style={styles.heading}>{result.Title}</Text>
						</View>
					))}
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
