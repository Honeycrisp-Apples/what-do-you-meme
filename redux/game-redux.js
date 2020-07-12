
//ACTION TYPES
const FETCH_INPUTS = 'FETCH_INPUTS'

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
  return async (dispatch, getState, {getFirebase, getFirestore})=>{
    getFirestore().collection('game').doc(`${gameID}`).get()
    .then((query)=> {
      const gameDoc = query.docs[0]
      let curInputs = gameDoc.data().inputs
      curInputs.forEach((input, ind)=>{
        //get rid of the old caption input value
        if(input.userId === userID){
          curInputs.splice(ind, 1)
        }
      })
      console.log("curInputs after splice", curInputs)
      // make a new input caption value
      let newInput = {caption, userID, vote: 0}
      //update gameDoc inputs array
      gameDoc.ref.update({
        inputs: [...curInputs, newInput]
      })
    })
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
    case FETCH_INPUTS:
      console.log('started fetch, but do you really need me if you have firebaseConnect??')
      return state
    default:
      console.log('hello redux beginnings')
      return state
  }
}
export default gameReducer
