import React, { Component } from 'react';
import { Text, Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import UserPermissions from '../utilities/UserPermissions';
import { uploadAvatar } from '../constants/Fire';
import firebase from 'firebase';
import Fire from '../constants/Fire';

export default class PickAvatar extends React.Component {
	state = {
		avatarImage: null
	};

	selectImage = async () => {
		UserPermissions.getCameraPermission();
		const options = {
			noData: true
		};

		await ImagePicker.launchImageLibraryAsync(options, (response) => {
			if (response.didCancel) {
				console.log('User cancelled image picker');
			} else if (response.error) {
				console.log('ImagePicker Error: ', response.error);
			} else if (response.customButton) {
				console.log('User tapped custom button: ', response.customButton);
			} else {
				const source = { uri: response.uri };
				console.log(source);
				this.setState({
					avatarImage: source
				});
			}
		});
	};

	onSubmit = async () => {
		try {
			const avatarImage = this.state.avatarImage;
			Fire.shared.uploadAvatar(avatarImage);

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
							title="Add an image"
						>
							Add an image
						</Button>
					)}
				</View>
				<Button status="success" onPress={this.onSubmit} style={{ marginTop: 30 }} title="Change Avatar">
					Change Avatar
				</Button>
			</View>
		);
	}
}
