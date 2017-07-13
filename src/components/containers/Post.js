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
      showMap: true,
      errors:''
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
    const postToggle = (this.state.showMap)? 'col-md-7': 'col-md-8 col-offset-2'
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
              <div className='btn-group'>
                <button className='btn btn-default'>
                  <i className='fa fa-bed fa-lg'></i>&nbsp;
                  {list[key]['beds']}
                </button>
                <button className='btn btn-default'>
                  <i className='fa fa-bath fa-lg'></i>&nbsp;
                  {list[key]['bath']}
                </button>
                <button className='btn btn-default'>
                  <i className='fa fa-car fa-lg'></i>&nbsp;
                  {list[key]['carpark']}
                </button>
              </div>
            </td>
            <td>
              <div style={{height:200, width:250, display:'block'}}>
                <img className='img-responsive' style={{height:'100%', width:'100%'}} src={list[key]['image']}></img>
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
        <div className='row hidden-sm hidden-xs' style={{marginBottom:'0px'}}>
          <div className='btn-group col-md-6 col-offset-3' role='group'>
            <button type="button" className={mapButton}  onClick={this.toggleMap.bind(this)}><span className='glyphicon glyphicon-globe'></span>&nbsp;{(this.state.showMap)? 'Hide Map': 'Show Map'}</button>
            <button type='button' className='btn btn-default'> Results&nbsp;<span className='badge'>{resultsCount.length}</span></button>
            <button type='button' className='btn btn-default disabled'> Sort&nbsp;<span className='fa fa-sort'></span>
            </button>
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
            <div id='mapscrool' className='col-md-5 hidden-sm hidden-xs' data-spy='affix' data-offset-top='90' data-offset-bottom='10'>
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
