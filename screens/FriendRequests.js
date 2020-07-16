import React from 'react';
import { Text, Button, View } from 'react-native';

export default function FriendRequests({ navigation }) {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Placeholder Screen</Text>
			<Button title="Go to UserMain" onPress={() => navigation.navigate('UserMain')} />
		</View>
	);
}
