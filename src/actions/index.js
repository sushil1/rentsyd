import constants from '../constants'
import {APIClient} from '../utils'

export default {

  fetchPosts: (params) => {

    return (dispatch) => {

      APIClient.get('/api/post', params)
      .then(response=>{
        if(response.confirmation !== 'success'){
          reject( new Error('message: '+response.message))
          return
        }
        dispatch({
          type: constants.POSTS_RECEIVED,
          posts: response.result
        })
      })
      .catch(err=> console.log('ERROR: '+err))
    }
  },


  searchPosts: (params, callback)=>{
    return (dispatch) => {

      APIClient.get('/api/post', params)
      .then(response=>{
        if(response.confirmation !== 'success'){
          throw new Error('message: '+response.message)
          return
        }
        dispatch({
          type: constants.SEARCH_POSTS_RECEIVED,
          posts: response.result
        })
      })
      .catch(err=>console.log('Error: ', err))

    }
  },

  fetchPost: (id) => {
    return (dispatch)=>{
      APIClient.get(`/api/post/${id}`)
      .then(response=>{
        if(response.confirmation !== 'success'){
          throw new Error('message: '+response.message)
          return
        }
        dispatch({
          type: constants.POST_RECEIVED,
          post: response.result
        })
      })
      .catch(err=>console.log('Error: '+err))
    }
  },

  deletePost: (id, callback) => {
    return (dispatch)=>{
      APIClient.handleDelete(`/api/post/${id}`)
      .then((response)=>{
        console.log('del response: '+JSON.stringify(response))
        return dispatch({
          type: constants.POST_DELETED,
          id
        })
      })
      .then(()=> callback())
      .catch(err=>console.log(err))
    }
  },

  updateCurrentLocation: (location) => {
    return {
      type: 'CURRENT_LOCATION_CHANGED',
      location: location
    }

  },


  registerUser: (params, callback) => {
    return (dispatch)=>{
      APIClient.post('/account/signup', params)
      .then(response=>{
        if(response.confirmation !== 'success'){
          throw new Error('message: '+response.message)
          return
        }
        return dispatch({
          type: constants.CURRENT_USER_RECEIVED,
          user: response.result
        })

      })
      .then(() => callback())
      .catch(err=> console.log(err))
    }
  },

  loginUser: (params, callback) => {
    return (dispatch)=>{
      APIClient.post('/account/login', params)
      .then(response=>{
        if(response.confirmation !== 'success'){
          throw new Error('message: '+response.message)
          return
        }
        dispatch({
          type: constants.CURRENT_USER_RECEIVED,
          user: response.result
        })
      })
      .then(()=>callback())
      .catch(err=> console.log(err+''))
    }
  },
  logoutUser: (params, callback)=>{
    console.log('logout user')
    return (dispatch)=>{
      APIClient.get('/account/logout', params)
      .then(response=>{
        if(response.confirmation !== 'success'){
          throw new Error('message: '+response.message)
          return
        }
        dispatch({
          type: constants.USER_LOGGED_OUT,
          user: null
        })
      })
      .then(()=>callback())
      .catch(err=>console.log(err+''))
    }

  },

  addNewPost: (params, callback)=>{
    return (dispatch)=>{

      APIClient.post('/api/post', params)
      .then(response=>{
        if(response.confirmation !== 'success'){
          throw new Error('message: '+response.message)
          return
        }
        dispatch({
          type: constants.POST_CREATED,
          post: response.result
        })
      })
      .then(()=> callback())
      .catch(err=> console.log('Error: '+err))
    }
  },

  getCurrentUser: ()=>{
    return (dispatch)=>{

      APIClient.get('/account/currentuser', null)
      .then(response=>{
        if(response.confirmation !== 'success'){
          throw new Error('message: '+response.message)
          return
        }
        dispatch({
          type: constants.CURRENT_USER_RECEIVED,
          user: response.result
        })
      })
      .catch(err=> console.log('Error: '+err))
    }
  }



}
