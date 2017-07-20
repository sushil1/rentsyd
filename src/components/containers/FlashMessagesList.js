import React, {Component} from 'react'
import {FlashMessage} from '../views'
import {connect } from 'react-redux'
import actions from '../../actions'

class FlashMessagesList extends Component{


  render(){
      const messageList = this.props.flash.messages || []
      if(messageList.length == 0){
        return null
      }
      const messages = messageList.map(message => {
        return <FlashMessage key={message.id}
        deleteFlashMessage={this.props.deleteFlashMessage}
         message={message} />
      })
    return(
      <div>{messages}</div>
    )
  }
}

const stateToProps = (state)=>{
  return{
    flash: state.flashMessages
  }
}

const dispatchToProps = (dispatch)=>{
  return{
    deleteFlashMessage: (id) => {
      dispatch(actions.deleteFlashMessage(id))
    }
  }
}

export default connect(stateToProps, dispatchToProps)(FlashMessagesList)
