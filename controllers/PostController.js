var Post = require('../models/Post')
var Promise = require('bluebird')
var utils = require('../utils')


module.exports = {

  get: function(params, isRaw){
    return new Promise(function(resolve, reject){
      //place the sort order
      var sortOrder = (params.sort == 'asc')? 1 : -1
      delete params['sort']
      //query by filters passed into parameter string
      var limit = params.limit
      if(limit == null){
        limit = '0'
      }
      delete params['limit']

      var currentLocation = params.currentLocation || null
      var bounds = params.bounds || null

      if(bounds !== null){

        params['geo'] = {
          $geoWithin : {
              $box: [
                [bounds.south, bounds.west],
                [bounds.north, bounds.east]
              ]
          }
        }

        delete params['currentLocation']
        delete params['bounds']

      }
      else if(bounds == null && currentLocation !== null){

        var range = 100/6371
        params['geo'] = {
          $near: [currentLocation.lat, currentLocation.lng],
          $maxDistance: range
        }
        delete params['currentLocation']
        delete params['bounds']
      }
      else if(bounds == null && currentLocation == null){
        delete params['bounds']
        delete params['currentLocation']
      }

    delete params['currentLocation']
    delete params['bounds']

    if(params.suburb && params.beds && params.bath){
    console.log('params from search here')
    var suburb = params.suburb
    var beds = params.beds
    var bath = params.bath
    params['address.suburb'] = suburb
    delete params['suburb']
    delete params['geo']
  }

      Post.find(params, null, {limit:parseInt(limit), sort:{timestamp:sortOrder}}, function(err, posts){
        if(err) {
          reject(err)
          return
        }
        if(posts.length === 0){
          reject(new Error('No posts found'))
          return
        }
        if(isRaw){
          resolve(posts)
          return
        }
        resolve(utils.Resource.convertToJson(posts))
      })
    })
  },

  post: function(params, isRaw){
    return new Promise(function(resolve, reject){
      Post.create(params, function(err, post){
        if(err) {
          reject(err)
          return
        }
        if (post == null){
					reject(new Error('Post not saved'))
					return
				}
        if(isRaw){
          resolve(post)
          return
        }
        resolve(post.summary())
      })
    })
  },

  getById: function(params, isRaw){
    return new Promise(function(resolve, reject){
      Post.findById(params, function(err, post){
        if(err) {
          reject(err)
          return
        }
        if (post == null){
					reject(new Error('Post not found'))
					return
				}
        if(isRaw){
          resolve(post)
          return
        }
        resolve(post.summary())
      })
    })
  },

  delete: function(id){
    return new Promise(function(resolve, reject){
      Post.findByIdAndRemove(id, function(err){
        if(err){
          reject(err)
          return
        }
        resolve(id)
      })
    })
  }



}
