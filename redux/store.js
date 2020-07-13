import React from 'react'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import {getFirestore, reduxFirestore} from 'redux-firestore'
import {getFirebase, reactReduxFirebase} from 'react-redux-firebase'

import rootReducer from './root-reducer'
import fireConfig from './fireConfig'

const initialState = {}
const store = createStore(rootReducer,
  initialState,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    // reduxFirestore(fireConfig),
    // reactReduxFirebase(fireConfig)
  ))

// const store = createStore(rootReducer, initialState)

export default store
