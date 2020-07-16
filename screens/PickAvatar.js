import React, { Component } from 'react';
import { Text, Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import UserPermissions from '../utilities/UserPermissions';
import { uploadAvatar } from '../constants/Fire';
import firebase from 'firebase';
import Fire from '../constants/Fire';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default class PickAvatar extends React.Component {
	constructor() {
		super();
		this.state = {
			avatarImage: null
		};
		// this.onSubmit = this.onSubmit.bind();
	}
	// state = {
	//  avatarImage: ''
	// };

	// selectImage = async () => {
	//  UserPermissions.getCameraPermission();
	//  const options = {
	//      noData: true
	//  };

	//  await ImagePicker.launchImageLibraryAsync(options, (response) => {
	//      if (!response.didCancel) {
	//          const source = { uri: response.uri };
	//          console.log('Source', source);
	//          this.setState({
	//              avatarImage: source
	//          });
	//          return firebase.firestore().collection('users').doc(this.getUID()).update({
	//              avatar: this.state.avatarImage
	//          });
	//      }
	//  });
	// };

	// onSubmit = async () => {
	//  try {
	//      const avatarImage = this.state.avatarImage;
	//      await Fire.shared.uploadAvatar(avatarImage);

	//      this.setState({
	//          avatarImage: avatarImage
	//      });
	//      console.log('AvatarImage:', avatarImage);
	//  } catch (e) {
	//      console.error(e);
	//  }
	// };

	componentDidMount() {
		this.getPermissionAsync();
	}

	getPermissionAsync = async () => {
		if (Constants.platform.ios) {
			const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
			if (status !== 'granted') {
				alert('Sorry, we need camera roll permissions to make this work!');
			}
		}
	};

	selectImage = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [ 4, 3 ],
				quality: 1
			});
			if (!result.cancelled) {
				await this.setState({ avatarImage: result.uri });
				firebase.firestore().collection('users').doc(Fire.shared.getUID()).update({
					avatar: this.state.avatarImage
				});
			}

			console.log(result);
		} catch (E) {
			console.log(E);
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
				{/* <Button status="success" onPress={this.onSubmit} style={{ marginTop: 30 }} title="Change Avatar">
                    Change Avatar
                </Button> */}
				<Button
					onPress={() => this.props.navigation.navigate('UserMain')}
					style={{ marginTop: 30 }}
					title="Return to Profile"
				>
					Return to Profile
				</Button>
			</View>
		);
	}
}
