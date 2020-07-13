
//ACTION TYPES
const FETCH_INPUTS = 'FETCH_INPUTS'
const UPDATE_PLAYING = "UPDATE_PLAYING"
const UPDATE_INPUTS = "UPDATE_INPUTS"

//ACTION THUNKS
export const fetchGameInputs = (gameID) => {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    // const firebase = getFirestore()
    getFirestore().collection('game').doc(`${gameID}`).get()
    .then((query)=> {
      const gameDoc = query.docs[0]
      return gameDoc.data().inputs
    }).then((inputs)=>{
      dispatch({type: FETCH_INPUTS, inputs})
    })
  }
}

export const updateGameInput = (gameID, userID, caption) => {
  console.log("Hi, you've reached your thunk . Leave a message at the tone.")
  return async (dispatch, getState, {getFirebase, getFirestore})=>{
    let gameDoc = await getFirestore().collection('game').doc(`${gameID}`).get()
    let curInputs = gameDoc.data().inputs
    console.log("current inputs: ", curInputs)
    let newInput = {caption, userID, vote: 0}
    console.log("new Inputs: ", newInput)
    await getFirestore().collection('game').doc(`${gameID}`).update({
        inputs: [...curInputs, newInput]
    })
    return dispatch({type: UPDATE_INPUTS,  added: 'done'})
  }
}

export const playing = (gameID)=> {
  return async (dispatch, getState, {getFirebase, getFirestore}) => {
    getFirestore.collection('game').doc(`${gameID}`).get()
    .then((gameDoc)=> {
      gameDoc.ref.update({
        playing: true
      })
    }). then(()=> dispatch({type: UPDATE_PLAYING, added: 'done'}))
  }
}

export const deleteGame = (gameID) => {
  return async (dispatch, getState, {getFirebase, getFirestore})=>{
    getFirestore().collection('game').dic(`${gameID}`).delete()
    .then(()=> console.log(`deleted the game: ${gameID}`))
  }
}

//REDUCERS
const gameReducer = (state = {}, action)=>{
  switch(action.type){
    case UPDATE_PLAYING:
      console.log(action.added)
      return state
    case UPDATE_INPUTS:
      console.log("inputs have been updated:", action.added)
      return state
    case FETCH_INPUTS:
      console.log('started fetch, but do you really need me if you have firebaseConnect??')
      return state
    default:
      console.log('hello redux beginnings')
      return state
  }
}
export default gameReducer
