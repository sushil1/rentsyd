import React, {Component} from 'react'
import actions from '../../actions'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {CSSTransitionGroup} from 'react-transition-group'
import {MapNavigation} from '../containers'

class PostDetail extends Component{

  componentDidMount(){
    //it is provided directly by react router, which helps us read the params object from our url
    const {id} = this.props.match.params
    this.props.fetchPost(id)
  }

  onDelete(){
    const {id} = this.props.match.params

    this.props.deletePost(id, ()=>{
      this.props.history.push('/')
    })
  }


  render(){
    const { post} = this.props
    if(!post){
      return <div>Loading...</div>
    }

    return(
      <div style={{paddingTop: '100px'}} className='container'>
        <button
          className='btn btn-danger pull-right'
          onClick={this.onDelete.bind(this)}
          style={{marginLeft:'30px'}}>Delete</button>
        <CSSTransitionGroup
          transitionName ='fade'
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnter={false}
          transitionLeave={false}
          >
          <h3>{post.address.street}{" "}{post.address.suburb}{" "}{post.address.postcode}</h3>
        <hr />
        <ul style={{textAlign:'center'}}>
            <li style={{display:'inline-block'}}>Beds:{post.beds}</li>
            <li style={{display:'inline-block', margin:'0 70px'}}>Bath:{post.bath}</li>
            <li style={{display:'inline-block'}}>Parking:{post.park}</li>
        </ul>
        <hr />
        </CSSTransitionGroup>
        <div className='panel'>
          <h4 style={{textAlign:'center'}}>{$}{post.price}{" AUD per week"}</h4>
        </div>

        <p className='well' style={{textAlign:'center'}}>{post.description}</p>
      </div>
    )
  }
}

const stateToProps = (state, ownProps)=>{
  return{
    post: state.post.list[ownProps.match.params.id]
  }
}

const dispatchToProps = (dispatch)=> {
  return{
    fetchPost: (id) => dispatch(actions.fetchPost(id)),
    deletePost: (id, callback) => dispatch(actions.deletePost(id, callback))
  }
}

export default connect(stateToProps, dispatchToProps)(PostDetail)
