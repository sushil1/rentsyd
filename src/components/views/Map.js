import React, {Component} from 'react'

class Map extends Component{

  shouldComponentUpdate(){
    return false
  }

  componentDidMount(){
    const markers = this.props.markers
    const center = {lat: this.props.lat, lng:this.props.lng}
    const zoom = this.props.zoom
    this.map = new google.maps.Map(this.refs.map, {
      center: center,
      zoom: zoom,
      zoomControl: true,
      mapTypeControl:false,
      scaleControl:false,
      streetViewControl:false,
      rotateControl:false,
      fullscreenControl:false
    })

    this.map.addListener('dragend', this.props.onDragEnd.bind(this, this.map))
    this.map.addListener('zoom_changed', this.props.onZoomChanged.bind(this, this.map))

    // var marker = markers.forEach(mark=>{
    //     new google.maps.Marker({
    //     position: mark,
    //     animation: google.maps.Animation.DROP,
    //     map:this.map
    //   })
    // })


  }


  componentWillReceiveProps(nextProps){
    var newM = JSON.stringify(nextProps.markers)
    var oldM = JSON.stringify(this.props.markers)
    var newCentre = {lat: nextProps.lat, lng:nextProps.lng}
    var oldCentre = {lat: this.props.lat, lng:this.props.lng}

    if(JSON.stringify(newCentre) !== JSON.stringify(oldCentre)){
      this.map.panTo(newCentre)
      this.map.setZoom(nextProps.zoom)
    }


    if(oldM !== newM){
      this.props.markers.forEach(marker=>{
        this.map.marker = null
      })
      var marker = nextProps.markers.forEach(mark=>{
          new google.maps.Marker({
          position: mark,
          //animation: google.maps.Animation.DROP,
          map:this.map
        })
      })
  }

    // var center = {lat: nextProps.lat, lng:nextProps.lng}
    // var circle = new google.maps.Circle({
    //   strokeColor:'#0000',
    //   strokeOpacity:0.8,
    //   strokeWeight:1,
    //   fillColor:'#35c4d0',
    //   fillOpacity:0.35,
    //   map:this.map,
    //   center: center,
    //   radius: 100
    // })


  }

  render(){
    return(
      <div id='map' style={{height: '100%', width:'100%', minHeight:700}} ref='map'>
      </div>
    )
  }
}


export default Map
