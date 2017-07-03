import React, {Component} from 'react'
import {Map} from '../views'
import actions from '../../actions'
import {connect} from 'react-redux'

class MapNavigation extends Component{


  mapDragged(map){
    var center = map.getCenter().toJSON()
    var bounds = map.getBounds().toJSON()
    var zoom = map.getZoom()
    const location = {
      center: center,
      bounds: bounds,
      zoom: zoom
    }

    this.props.updateCurrentLocation(location)
  }

  zoomChanged(map){
    var zoom = map.getZoom()
    var center = map.getCenter().toJSON()
    var bounds = map.getBounds().toJSON()
    const location = {
      center: center,
      bounds: bounds,
      zoom: zoom
    }

    this.props.updateCurrentLocation(location)

  }



  render(){

    const list = this.props.post.list
    const positions = []
    var postId = Object.keys(list)
    postId.map(id=>{
      const pos = {lat:list[id]['geo'][0], lng:list[id]['geo'][1]}
      positions.push(pos)
    })


    return(
      <div>
        <Map lat={this.props.post.currentLocation.lat} lng={this.props.post.currentLocation.lng} zoom={this.props.post.zoom}
        markers={positions}
        onDragEnd={this.mapDragged.bind(this)}
        onZoomChanged={this.zoomChanged.bind(this)}

        />
      </div>
    )
  }
}

const stateToProps = (state)=>{
  return{
    post: state.post
  }
}

const dispatchToProps = (dispatch)=>{
  return{
    updateCurrentLocation: (location)=>dispatch(actions.updateCurrentLocation(location))
  }
}


export default connect(stateToProps, dispatchToProps)(MapNavigation)
