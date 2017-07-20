import constants from '../constants'
import shortid from 'shortid'
import {findIndex} from 'lodash'


var initialState = {
  messages: []
}

export default (state=initialState, action) => {

  let updated = Object.assign({}, state)

  switch(action.type){

    case constants.ADD_FLASH_MESSAGE:
      let messageList = updated['messages']
      messageList.push({
        id: shortid.generate(),
        type: action.message.type,
        text: action.message.text
      })
      return updated

    case constants.FLASH_MESSAGE_DELETED:
      let list = updated['messages']
      const index = findIndex(list, {id: action.id})
      if(index >= 0){
        return [
          ...list.slice(0, index),
          ...list.slice(index + 1)
        ]
      }
      return updated

    case constants.CLEAR_FLASH_MESSAGES:
      let msgList = updated['messages']
      msgList.length = 0
      return updated

    default:
      return updated
  }


}
