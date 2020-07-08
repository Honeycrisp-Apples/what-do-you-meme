import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';

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

  return (
    <NavigationContainer>
      {/* <Navigation colorScheme={colorScheme} /> */}
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="Login"
          component={Login}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignUp"
          component={SignUp}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Welcome"
          component={Welcome}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Memes"
          component={Memes}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="UserPages"
          component={UserTabs}
        />
      </Stack.Navigator>

      {/* <StatusBar /> */}
    </NavigationContainer>
  );
  // }
}
