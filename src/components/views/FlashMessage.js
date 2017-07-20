import React, {Component} from 'react'
import classnames from 'classnames'

class FlashMessage extends Component{

  constructor(props){
    super(props)
  }

  buttonClicked(e){
    e.preventDefault()
    this.props.deleteFlashMessage(this.props.message.id)
  }

  render(){
    const {id, type, text} = this.props.message
    return(
      <div className={classnames('alert', {
        'alert-success': type === 'success',
        'alert-danger': type === 'error'
      })}>
        <button onClick={this.buttonClicked.bind(this)} className='close'><span>&times;</span></button>
        {text}

      </div>
    )
  }
}



export default FlashMessage
