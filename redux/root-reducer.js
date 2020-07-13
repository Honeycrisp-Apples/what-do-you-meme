import {combineReducers} from 'redux'
import {firestoreReducer} from 'redux-firestore'
import {firebaseReducer} from "react-redux-firebase";
import gameReducer from './game-redux'


const rootReducer = combineReducers({
  gameStuff: gameReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
})

export default rootReducer
