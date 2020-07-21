import React, {useState, useEffect} from 'react'
import {StyleSheet, View, Text, Dimensions} from 'react-native'
import {IconButton} from 'react-native-paper'
const {width, height} = Dimensions.get('window')

export function CustomAlert(props){
  const {title, message, visible} = props
  const [disp, setDisp] = useState("flex")


  // useEffect(()=>{
  //   setDisp(visible)
  // }, [])

  return(
    <View style={[styles.cont, {display: disp}]}>
      <View style={[styles.alertBox, {display: disp}]}>
      <IconButton
              style={{
                marginLeft: 'auto',
                position: 'absolute',
                top: 10,
                right: 10,
                // zIndex: 1,
              }}
              icon="close-circle"
              size={24}
              color="blue"
              // onPress={() => {
              //   setDisp('none')
              // }}
        />
        <Text style={{fontSize: 30, color: 'purple', fontFamily: 'FredokaOne_400Regular' , textAlign: 'center', marginTop: 10}}>{title}</Text>
        <Text style={{fontSize: 20, color: 'black', fontFamily: 'FredokaOne_400Regular' , textAlign: 'center', marginTop: 10}}>{message}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  cont: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "#F5FCFF",
    backgroundColor: 'rgba(0,0,0,0.7)',
    height: height,
    width: width
  },
  alertBox: {
    backgroundColor: 'white',
    width: width * .8,
    padding: 20,
    borderRadius: 20
  }
})
