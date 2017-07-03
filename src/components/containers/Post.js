import React, {Component} from 'react'
import {APIClient} from '../../utils'
import actions from '../../actions'
import {connect} from 'react-redux'
import {Link } from 'react-router-dom'
import MapNavigation from './MapNavigation'
import Loader from 'react-loaders'

class Post extends Component{

  constructor(){
    super()

    this.state = {
      showMap: true
    }
  }

  toggleMap(e){
    this.setState({
      showMap: !this.state.showMap
    })
  }

  componentDidMount(){
    var currentLocation = this.props.post.currentLocation
    var bounds = this.props.post.bounds
    var postQuery = {bounds: bounds, currentLocation:currentLocation}
    console.log('componentDidMount')

    this.props.fetchPosts(postQuery)
  }

  componentDidUpdate(){
    var currentLocation = this.props.post.currentLocation
    var bounds = this.props.post.bounds
    var postQuery = {bounds: bounds, currentLocation:currentLocation}
    console.log('componentDidUpdate')

    if(Object.keys(this.props.post.list).length == 0){
      console.log('componentDidUpdate')
      this.props.fetchPosts(postQuery)
  }

  }

  render(){
    const list = this.props.post.list
    const mapStatus = (this.state.showMap)? null : 'hidden'
    const postToggle = (this.state.showMap)? 'col-md-7': 'col-md-10'
    const mapButton = (this.state.showMap)? 'btn btn-success' : 'btn btn-warning'
    const resultsCount = Object.keys(list)
    const displayList = Object.keys(list).map((key, val) =>{
      return(
        <tr key={key}>
            <td>
              <p>${list[key]['price']}{" pw"}</p>
              <br />

              <Link to={`/post/${key}`}>
                <strong>
                  {list[key]['address']['street']}<br />
                  {list[key]['address']['suburb']}{" "}
                  {list[key]['address']['postcode']}
                </strong>
              </Link>
              <hr />
              <span className='glyphicon glyphicon-bed'></span>{" "}{list[key]['beds']}{" | "}{list[key]['bath']}{" baths"}
            </td>
            <td>
              <div className='thumbnail'>
                <img style={{height:180, width:200}} src={list[key]['image']}></img>
              </div>
              <div className='caption'>
                <span className="label label-default">{list[key]['profile']['name']}</span>
              </div>
            </td>
        </tr>
      )
    })

    return(
      <div className='container' style={{paddingTop:'70px'}}>
        <div className='row' style={{paddingBottom:'20px'}}>
          <div className='btn-group' role='group'>
            <button type="button" className="btn btn-default"><span className='glyphicon glyphicon-th-list'></span>{" "}List</button>
            <button type="button" className={mapButton}  onClick={this.toggleMap.bind(this)}><span className='glyphicon glyphicon-globe'></span>{" "}Map</button>
            <button type='button' className='btn btn-default'> Results{" "}<span className='badge'>{resultsCount.length}</span></button>
          </div>
        </div>
        <div className='row'>
          <div className={postToggle}>
          <table className='table table-striped'>
            <thead>
            </thead>
            <tbody>
              {displayList}

            </tbody>
          </table>
          </div>
          <div className={mapStatus}>
            <div id='mapscrool' className='col-md-5 hidden-sm hidden-xs' data-spy='affix' data-offset-top='100' data-offset-bottom='20'
            >
                <MapNavigation />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const stateToProps = (state) => {
  return{
    post: state.post
  }
}

const dispatchToProps = (dispatch) => {
  return{
    fetchPosts: (params) => dispatch(actions.fetchPosts(params))
  }
}

export default connect(stateToProps, dispatchToProps)(Post)
