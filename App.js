import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import firebase, { storage } from 'firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { Text } from 'react-native';

import UserTabs from './navigation/UserPageBottomTab';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { createAppContainer } from 'react-navigation';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import Welcome from './screens/Welcome';
import Memes from './screens/Memes';
import UserMain from './screens/UserMain';
import UserAwards from './screens/UserAwards';
import UserFriends from './screens/UserFriends';
import PickAvatar from './screens/PickAvatar';
import SearchFriends from './screens/SearchFriends';
import FriendRequests from './screens/FriendRequests';
import GameLobby from './screens/GameScreens/GameLobby';
import MemePresentation from './screens/GameScreens/MemePresentation';
import CaptionInput from './screens/GameScreens/CaptionInput';
import RoundResults from './screens/GameScreens/RoundResults';
import VotingScreen from './screens/GameScreens/VotingScreen';
import WinningScreen from './screens/GameScreens/WinningScreen';
import Game from './screens/Game';
import { PartyLobby } from './screens/GameScreens/privateGames/PartyLobby';
import { JoinParty } from './screens/GameScreens/privateGames/JoinParty';

//needed for react/redux/firestore connection
import { Provider } from 'react-redux';
import store from './redux/store';
import { createFirestoreInstance, reduxFirestore } from 'redux-firestore';
import { ReactReduxFirebaseProvider, isLoaded } from 'react-redux-firebase';
import firebase2 from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import { decode, encode } from 'base-64';
if (!global.btoa) {
	global.btoa = encode;
}

if (!global.atob) {
	global.atob = decode;
}

//function defining normal stack and function defining tab stack and combine those
//V4 bottom stack navigation
export default function App() {
	const rrfConfig = {
		userProfile: 'users',
		useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
	};
	const rrfProps = {
		firebase: firebase2,
		config: rrfConfig,
		dispatch: store.dispatch,
		createFirestoreInstance // <- needed if using firestore
	};

	const [ user, loading, error ] = useAuthState(firebase.auth());
	// const isLoadingComplete = useCachedResources();
	// const colorScheme = useColorScheme();

	// const navigator = createStackNavigator(
	//   {
	//     Login: { screen: Login },
	//     SignUp: { screen: SignUp },
	//     Welcome: { screen: Welcome },
	//     Memes: { screen: Memes },
	//     UserMain: { screen: UserMain },
	//     UserAwards: { screen: UserAwards },
	//     UserFriends: { screen: UserFriends },
	//   },
	//   { mode: 'modal' }

	//   // if (!isLoadingComplete) {
	// );
	//   return null;
	// } else {
	// const Main = createAppContainer(navigator, UserTabs);
	// return <Main />;
	const Stack = createStackNavigator();

	const LoginStack = createStackNavigator();
	// 	Login: { screen: Login },
	// 	SignUp: { screen: SignUp },
	// 	Welcome: { screen: Welcome }
	// });
	if (loading) {
		return <Text>Initialising User...</Text>;
	}
	if (error) {
		return <Text>Error: {error}</Text>;
	}
	if (user) {
		return (
			<Provider store={store}>
				<ReactReduxFirebaseProvider {...rrfProps}>
					<NavigationContainer>
						{/* <Navigation colorScheme={colorScheme} /> */}
						<Stack.Navigator>
							{/* <Stack.Screen options={{ headerShown: false }} name="Login" component={Login} />
							<Stack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} /> */}
							<Stack.Screen options={{ headerShown: false }} name="Welcome" component={Welcome} />
							<Stack.Screen options={{ headerShown: false }} name="Memes" component={Memes} />
							<Stack.Screen options={{ headerShown: false }} name="UserPages" component={UserTabs} />
							<Stack.Screen options={{ headerShown: false }} name="PickAvatar" component={PickAvatar} />
							<Stack.Screen
								options={{ headerShown: false }}
								name="SearchFriends"
								component={SearchFriends}
							/>
							<Stack.Screen
								options={{ headerShown: false }}
								name="FriendRequests"
								component={FriendRequests}
							/>
							<Stack.Screen options={{ headerShown: false }} name="GameLobby" component={GameLobby} />
							<Stack.Screen options={{ headerShown: false }} name="PartyLobby" component={PartyLobby} />
							<Stack.Screen options={{ headerShown: false }} name="JoinParty" component={JoinParty} />
							<Stack.Screen options={{ headerShown: false }} name="GameComp" component={Game} />
							<Stack.Screen
								options={{ headerShown: false }}
								name="MemePresentation"
								component={MemePresentation}
							/>
							<Stack.Screen
								options={{ headerShown: false }}
								name="CaptionInput"
								component={CaptionInput}
							/>
							<Stack.Screen
								options={{ headerShown: false }}
								name="VotingScreen"
								component={VotingScreen}
							/>
							<Stack.Screen
								options={{ headerShown: false }}
								name="RoundResults"
								component={RoundResults}
							/>
							<Stack.Screen
								options={{ headerShown: false }}
								name="WinningScreen"
								component={WinningScreen}
							/>
						</Stack.Navigator>
						{/* <StatusBar /> */}
					</NavigationContainer>
				</ReactReduxFirebaseProvider>
			</Provider>
		);
	} else {
		return (
			<Provider store={store}>
				<ReactReduxFirebaseProvider {...rrfProps}>
					<NavigationContainer>
						<LoginStack.Navigator>
							<LoginStack.Screen options={{ headerShown: false }} name="Login" component={Login} />
							<LoginStack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} />
						</LoginStack.Navigator>
					</NavigationContainer>
				</ReactReduxFirebaseProvider>
			</Provider>
		);
	}
	// const logic = () =>
	// 	firebase.auth().onAuthStateChanged((user) => {
	// 		if (user) {
	// 			console.log('Theres a user!');
	// 			return (
	// 				<NavigationContainer>
	// 					<LoginStack.Navigator>
	// 						<LoginStack.Screen options={{ headerShown: false }} name="Login" component={Login} />
	// 						<LoginStack.Screen options={{ headerShown: false }} name="SignUp" component={SignUp} />
	// 					</LoginStack.Navigator>
	// 				</NavigationContainer>
	// 			);
	// 		} else {
	// 			console.log('There isnt a user!');
	// 			return (

	// 			);
	// 		}
	// 	});
	// console.log('this is the logic:', logic());
	// return logic();
}
