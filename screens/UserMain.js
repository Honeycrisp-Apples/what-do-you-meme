import React from 'react';
import { Text, SafeAreaView, Button, StyleSheet, ScrollView, Image, View, Dimensions } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import firebase from 'firebase';
import { FormButton, FormInut } from '../components/Reusables';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Fire from '../constants/Fire';
// import UserPermissions from '../utilities/UserPermissions';
// import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get('screen');

export default function UserMain({ navigation }) {
	//we need to refactor the doc.id to be the user _id
	//USER NEEDS DISPLAY NAME
	//that user_id should be passed in via navigation from the welcome screen
	const [ value, loading, error ] = useDocument(
		firebase.firestore().collection('users').doc(`${Fire.shared.getUID()}`)
	);
	// async function PickAvatar() {
	// 	UserPermissions.getCameraPermission();

	// 	let result = await ImagePicker.launchImageLibraryAsync({
	// 		mediaTypes: ImagePicker.MediaTypeOptions.Images,
	// 		allowsEditing: true
	// 	});
	// 	if (!result.cancelled) {
	// 		this.setState({ user: { ...this.state.user, avatar: result.uri } });
	// 	}
	// }

	function handlePickAvatarNavigation() {
		navigation.navigate('PickAvatar');
	}

	if (error) {
		return <Text>Error: {JSON.stringify(error)}</Text>;
	} else if (loading) {
		return <Text>Collection: Loading...</Text>;
	} else if (value) {
		return (
			<SafeAreaView style={styles.background}>
				<ScrollView contentContainerStyle={{ flex: 1 }}>
					<Card style={styles.card}>
						<IconButton
							style={{
								marginLeft: 'auto',
								position: 'absolute',
								top: 10,
								right: 0,
								zIndex: 1
							}}
							icon="close-circle"
							size={36}
							color="orange"
							onPress={() => navigation.navigate('Welcome')}
						/>
						<View style={styles.topPart}>
							<View style={styles.imgCont}>
								<Image style={styles.img} source={{ uri: `${value.data().avatar}` }} />
								{/* change imageurl to avatar above                       ^^^^^^ */}
								<TouchableOpacity style={{ marginTop: 5 }} onPress={handlePickAvatarNavigation}>
									<Text
										style={{
											fontSize: 10,
											textAlign: 'center',
											color: 'darkred'
										}}
									>
										Change Picture
									</Text>
								</TouchableOpacity>
							</View>

							<View style={styles.nameCont}>
								<Text style={{ fontSize: 24, fontWeight: 'bold' }}>
									{value.data().displayName.toUpperCase()}
								</Text>
								<Text style={{ fontSize: 16 }}>{`Memer Points: ${value.data().points}`}</Text>
							</View>
						</View>

						<View>
							{/* <Hr lineColor='red' text='line style and text style'
            lineStyle={{
                backgroundColor: "blue",
                height: 2
            }}
            textStyle={{
                color: "green",
                fontSize: 20,
                textDecorationLine: "underline",
                textDecorationStyle: "solid",
                textDecorationColor: "#000"
            }}
          /> */}
							<View style={styles.underlined}>
								<Text style={{ fontSize: 16, marginBottom: 3 }}>Earned Memes: </Text>
							</View>

							<View style={styles.memeCont}>
								{value.data().earnedMemes.length ? (
									value
										.data()
										.earnedMemes.map((meme, index) => (
											<Image key={index} style={styles.memes} source={meme} />
										))
								) : (
									<Text>You gotta start playing some games!</Text>
								)}
								{/* <Image
                style={styles.memes}
                source={require('../assets/images/icon.png')}
              />
              <Image
                style={styles.memes}
                source={require('../assets/images/icon.png')}
              />
              <Image
                style={styles.memes}
                source={require('../assets/images/icon.png')}
              />
              <Image
                style={styles.memes}
                source={require('../assets/images/icon.png')}
              /> */}
							</View>
						</View>

						{/* <FormButton
              title={'To Awards'}
              modeValue={'contained'}
              onPress={() => this.props.navigation.navigate('UserAwards')}
            />
            <FormButton
              title={'To Friends'}
              modeValue={'contained'}
              onPress={() => this.props.navigation.navigate('UserFriends')}
            />
            <FormButton
              title={'To Welcome'}
              modeValue={'contained'}
              onPress={() => this.props.navigation.navigate('Welcome')}
            />*/}
					</Card>
				</ScrollView>
			</SafeAreaView>
		);
	}
}
//might need to change for version 5 react-navigaiton
// UserMain.navigationOptions = (screenProps) => {
//   return {
//     // title: screenProps.navigation.getParam("yourParam"),
//     headerShown: false,
//   };
// };

const styles = StyleSheet.create({
	background: {
		backgroundColor: 'darkred',
		flex: 1
	},
	card: {
		marginTop: 20,
		// marginTop: 50,
		marginHorizontal: 5,
		// borderTopEndRadius: 10,
		flex: 1,
		flexGrow: 1
	},
	topPart: {
		// flex:1,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		margin: 20
	},
	imgCont: {
		marginRight: 10
	},
	img: {
		borderRadius: 100 / 2,
		borderWidth: 3,
		borderColor: 'darkred',
		width: 100,
		height: 100
	},
	nameCont: {
		flexGrow: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	underlined: {
		// borderWidth: 10,
		// height: 50,
		borderBottomColor: 'darkred',
		// borderEndWidth: 10,
		borderBottomWidth: 3,
		marginHorizontal: 24
	},
	memeCont: {
		marginHorizontal: 24,
		flexDirection: 'row',
		flexWrap: 'wrap'
		// justifyContent: 'space-around'
	},
	memes: {
		height: width / 3.5 - 5,
		width: width / 3.5 - 5,
		// marginHorizontal: 5
		marginVertical: 5,
		// display: 'inline'
		marginRight: 5
	}
});
