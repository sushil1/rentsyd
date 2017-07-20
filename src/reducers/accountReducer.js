import constants from '../constants'

var initialState = {
  currentUser: null,
  errors: null
}

export default (state=initialState, action)=>{

  let updated = Object.assign({}, state)

  switch(action.type){

    case constants.CURRENT_USER_RECEIVED:
      updated['currentUser'] = action.user
      updated['errors'] = null
      return updated

    case constants.USER_LOGGED_OUT:
      updated['currentUser'] = action.user
      updated['errors'] = null
      return updated

    case constants.USER_ACCOUNT_ERROR:
        updated['errors'] = action.message
        return updated

    default:
      return updated
  }

}
