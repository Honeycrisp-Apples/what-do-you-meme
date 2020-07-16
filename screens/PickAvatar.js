import React, { Component } from 'react';
import { Text, SafeAreaView, Button, StyleSheet, ScrollView, Image, View, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default class PickAvatar extends React.Component {
	state = {
		avatarImage: null
	};

	selectImage = () => {
		const options = {
			noData: true
		};
		ImagePicker.launchImageLibrary(options, (response) => {
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			} else {
				const source = { uri: response.uri };
				this.setState({
					avatarImage: source
				});
			}
		});
	};

	onSubmit = async () => {
		try {
			const avatarImage = this.state.avatarImage;
			this.props.firebase.uploadAvatar(avatarImage);

			this.setState({
				avatarImage: null
			});
		} catch (e) {
			console.error(e);
		}
	};

	render() {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<Text category="h2">Edit Avatar</Text>
				<View>
					{this.state.avatarImage ? (
						<Image source={this.state.avatarImage} style={{ width: 300, height: 300 }} />
					) : (
						<Button
							onPress={this.selectImage}
							style={{
								alignItems: 'center',
								padding: 10,
								margin: 30
							}}
						>
							Add an image
						</Button>
					)}
				</View>
				<Button status="success" onPress={this.onSubmit} style={{ marginTop: 30 }}>
					Change Avatar
				</Button>
			</View>
		);
	}
}
