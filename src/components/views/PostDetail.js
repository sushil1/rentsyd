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
      {(this.props.account.currentUser !== null)&&(post.profile.id === this.props.account.currentUser.id) &&
        <button
          className='btn btn-danger pull-right'
          onClick={this.onDelete.bind(this)}
          style={{marginLeft:'30px'}}>Delete</button>
      }

          <h3>{post.address.street}</h3>
          <h4>{post.address.suburb}{" "}{post.address.postcode}</h4>
          <CSSTransitionGroup
            transitionName ='fade'
            transitionAppear={true}
            transitionAppearTimeout={500}
            transitionEnter={false}
            transitionLeave={false}
            >
        <ul style={{textAlign:'center'}}>
            <li style={{display:'inline-block'}}><i className='fa fa-bed fa-2x fa-fw'></i>&nbsp;{post.beds}</li>
            <li style={{display:'inline-block', margin:'0 70px'}}><i className='fa fa-bath fa-2x fa-fw'></i>&nbsp;{post.bath}</li>
            <li style={{display:'inline-block'}}><i className='fa fa-car fa-2x fa-fw'></i>&nbsp;{post.carpark}</li>
        </ul>
        </CSSTransitionGroup>
        <hr />
          <h4 style={{textAlign:'center'}}>${post.price}{" per week"}</h4>

        <p className='well' style={{textAlign:'center'}}>{post.description}</p>
      </div>
    )
  }
}

const stateToProps = (state, ownProps)=>{
  return{
    post: state.post.list[ownProps.match.params.id],
    account: state.account
  }
}

const dispatchToProps = (dispatch)=> {
  return{
    fetchPost: (id) => dispatch(actions.fetchPost(id)),
    deletePost: (id, callback) => dispatch(actions.deletePost(id, callback))
  }
}

export default connect(stateToProps, dispatchToProps)(PostDetail)
