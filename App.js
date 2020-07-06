import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';




import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';
import Login from './screens/Login'
import SignUp from './screens/SignUp'
import Welcome from './screens/Welcome'
import Memes from './screens/Memes'

export default function App() {
  // const isLoadingComplete = useCachedResources();
  // const colorScheme = useColorScheme();

  const navigator = createStackNavigator({
    Login: {screen: Login},
    SignUp: {screen: SignUp},
    Welcome: {screen: Welcome},
    Memes: {screen: Memes}
  }, {mode:'modal'})

  // if (!isLoadingComplete) {
  //   return null;
  // } else {
  const Main = createAppContainer(navigator)
  return <Main/>
    // return (
    //   <SafeAreaProvider>
    //     {/* <Navigation colorScheme={colorScheme} /> */}

    //     <StatusBar />
    //   </SafeAreaProvider>
    // );
  // }
}
