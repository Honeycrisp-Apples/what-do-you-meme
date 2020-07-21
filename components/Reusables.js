import React from 'react';
import { StyleSheet, Dimensions, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Textarea from 'react-native-textarea'
import {
  useFonts,
  FredokaOne_400Regular,
  ZillaSlabHighlight_700Bold,
} from '@expo-google-fonts/dev';

const { width, height } = Dimensions.get('screen');

export function FormInput({ labelName, ...rest }) {
  let [fontsLoaded] = useFonts({
    FredokaOne_400Regular,
    ZillaSlabHighlight_700Bold,
  });
  if (!fontsLoaded) {
    return null
  } else {
  return (
    <TextInput
      label={labelName}
      style={styles.input}
      // numberOfLines={1}
      // multiline={true}
      // numberOfLines={4}
      mode={'flat'}
      // mode={'outlined'}
      // fontFamily={'FredokaOne_400Regular'}
      selectionColor={'blue'}
      underlineColor={'blue'}
      theme={{colors: {primary: 'blue'}}}
      // outline={false}
      {...rest}
    />
  );
  }
}

export function FormButton({ title, modeValue, colorValue='darkred', ...rest }) {
  // let [fontsLoaded] = useFonts({
  //   FredokaOne_400Regular,
  //   ZillaSlabHighlight_700Bold,
  // });
  // if (!fontsLoaded) {
  //   return null
  // } else {
    return (
      <Button
      mode={modeValue}
      {...rest}
      style={styles.button}
      contentStyle={styles.buttonContainer}
      color={colorValue}
      labelStyle={styles.buttonText}
      >
      {title}
      </Button>
    );
  // }
}

export function FormTextArea({ labelName, modeValue, ...rest }) {
  return (
    <Textarea
      label={labelName}
      mode={'outlined'}
      // mode={modeValue}
      {...rest}
      //  multiline={true}
      // numberOfLines={4}
      style={styles.textarea}
      // contentStyle={styles.buttonContainer}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 10,
    // marginBottom: 10,
    overflow: 'hidden',
    // width: width / 1.5,
    height: height / 15,
    // borderBottomColor: 'white',
    borderRadius: 5,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    marginHorizontal: 24,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
    fontFamily: "FredokaOne_400Regular"
    // color: 'darkred'
  },
  textarea:{
    marginTop: 10,
    marginHorizontal: 24,
    borderRadius: 5,
    textAlignVertical: 'top',
    backgroundColor: '#fff',
  },
  button: {
    borderWidth: 3,
    borderColor: 'white',
    marginTop: 10,
    // backgroundColor: 'darkred',
    marginHorizontal: 24
    // textColor: 'white'
  },
  buttonContainer: {
    // width: width / 2,
    height: height / 15,
    marginHorizontal: 24,
    // backgroundColor: 'darkred',
    color: 'white'
    // height: 24
  },
  buttonText:{
    fontFamily: "FredokaOne_400Regular"
  }
});
