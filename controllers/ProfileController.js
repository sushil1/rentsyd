var Profile = require('../models/Profile')
var Promise = require('bluebird')
var bcrypt = require('bcryptjs')
var utils = require('../utils')


module.exports = {

  get: function(params, isRaw){
    return new Promise(function(resolve, reject){
      Profile.find(params, function(err, profiles){
        if(err) {
          reject(err)
          return
        }
        if(isRaw){
          resolve(profiles)
          return
        }
        resolve(utils.Resource.convertToJson(profiles))
      })
    })
  },

  post: function(params, isRaw){
    return new Promise(function(resolve, reject){
      if(params['password']){
        params['password'] = bcrypt.hashSync(params.password, 10)
      }
      Profile.create(params, function(err, profile){
        if(err) { return reject(err) }
        if(isRaw){
          resolve(profile)
          return}
        resolve(profile.summary())
      })
    })
  },

  getById: function(params, isRaw){
    return new Promise(function(resolve, reject){
      Profile.findById(params, function(err, profile){
        if(err) {
          reject(err)
          return
        }
        if (profile == null){
					reject(new Error('Profile not found'))
					return
				}
        if(isRaw){
          resolve(profile)
          return
        }
        resolve(profile.summary())
      })
    })
  },

  delete: function(id){
    return new Promise(function(resolve, reject){
      Profile.findByIdAndRemove(id, function(err){
        if(err){
          reject(err)
          return
        }
        resolve(id)
      })
    })
  }

}
