import {combineReducers} from 'redux'
import {firestoreReducer} from 'redux-firestore'
import gameReducer from './game-redux'

const rootReducer = combineReducers({
  gameStuff: gameReducer,
  firestoreData: firestoreReducer
})

export default rootReducer
