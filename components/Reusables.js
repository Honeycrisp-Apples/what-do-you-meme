import React from 'react';
import { StyleSheet, Dimensions, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import Textarea from 'react-native-textarea'

const { width, height } = Dimensions.get('screen');

export function FormInput({ labelName, ...rest }) {
  return (
    <TextInput
      label={labelName}
      style={styles.input}
      // numberOfLines={1}
      // multiline={true}
      // numberOfLines={4}
      mode={'flat'}
      // mode={'outlined'}
      selectionColor={'darkred'}
      underlineColor={'darkred'}
      theme={{colors: {primary: 'red'}}}
      // outline={false}
      {...rest}
    />
  );
}

export function FormButton({ title, modeValue, colorValue='darkred', ...rest }) {
  return (
    <Button
      mode={modeValue}
      {...rest}
      style={styles.button}
      contentStyle={styles.buttonContainer}
      color={colorValue}
    >
      {title}
    </Button>
  );
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
  }
});
