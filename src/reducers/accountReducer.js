import constants from '../constants'

var initialState = {
  currentUser: null
}

export default (state=initialState, action)=>{

  let updated = Object.assign({}, state)

  switch(action.type){

    case constants.CURRENT_USER_RECEIVED:
      updated['currentUser'] = action.user
      return updated

    case constants.USER_LOGGED_OUT:
      updated['currentUser'] = action.user
      return updated

    default:
      return updated
  }

}
