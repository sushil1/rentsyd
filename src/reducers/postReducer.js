import constants from '../constants'

var initialState = {
  list: {},
  currentLocation: {
    lat: -33.7937236,
    lng: 151.1347434
  },
  bounds: {},
  zoom: 11
}

export default (state=initialState, action) => {
  let updated = Object.assign({}, state)
  switch(action.type){

    case constants.POSTS_RECEIVED:
      const posts = action.posts
      posts.forEach((post)=>{
        const id= post.id
        updated['list'][id] = post
      })
      return updated

    case constants.SEARCH_POSTS_RECEIVED:
      const searchResult = action.posts
      updated['list'] = {}
      searchResult.forEach((post)=>{
        const id= post.id
        updated['list'][id] = post
      })
      if(searchResult.length > 0){
        var newCentre = searchResult[0]['geo']
        updated['currentLocation']['lat'] = newCentre[0]
        updated['currentLocation']['lng'] = newCentre[1]
        updated['zoom'] = 15
      }
      return updated

    case constants.POST_RECEIVED:
      const post = action.post
      updated['list'][post.id] = post
      return updated

    case constants.POST_CREATED:
      const newPost = action.post
      const newPostId = newPost.id
      //Array.prototype.unshift.call(updated['list'],{newPostId: newPost})
      updated['list'][newPostId] = newPost
      //console.log(updatedList)
      return updated

    case constants.POST_DELETED:
      const id = action.id
      delete updated['list'][id]
      return updated

    case constants.CURRENT_LOCATION_CHANGED:
      updated['currentLocation'] = action.location.center
      updated['zoom'] = action.location.zoom
      updated['bounds'] = action.location.bounds
      updated['list'] = {}
      return updated

    default:
      return updated
  }
}
