var express = require('express')
var router = express.Router()
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
var controllers = require('../controllers')

router.get('/currentuser', function(req, res, next){
  if(req.rentSyd == undefined){
    res.json({
      confirmation:'fail',
      message: 'no session set'
    })
    return
  }
  if(req.rentSyd.token === null){
    res.json({
      confirmation:'fail',
      message: 'no token assigned'
    })
    return
  }
  jwt.verify(req.rentSyd.token, process.env.JWT_TOKEN_SECRET, function(err, decode){
    if(err){
      res.json({
        confirmation:'fail',
        message: err+''
      })
      return
    }
    controllers.profile.getById(decode.id, false)
    .then(function(profile){
      res.json({
        confirmation:'success',
        result: profile
      })
    })
    .catch(function(err){
      res.json({
        confirmation:'fail',
        message: err+''
      })
    })
  })
})

router.post('/signup', function(req, res, next){
  var email = req.body.email
  controllers.profile.get({email: email}, false)
  .then(profile=>{
    if(profile.length !== 0){
      res.json({
        confirmation:'fail',
        message:'email already registered'
      })
      return
    }
      return controllers.profile.post(req.body, false)
        .then(profile=>{
          var token = jwt.sign({id:profile.id}, process.env.JWT_TOKEN_SECRET, {expiresIn:4000})
          req.rentSyd.token = token
          res.json({
            confirmation:'success',
            result:profile,
            token:token
          })
        })

  })
  .catch(err=>{
    res.json({
      confirmation:'fail',
      message:err + ''
    })
  })
})

router.post('/login', function(req, res, next){
  var credentials = {email: req.body.email, password:req.body.password}

  if(credentials.password == null){
    res.json({
      confirmation:'fail',
      message:'password required'
    })
    return
  }

  delete req.body['password']

  controllers.profile.get({email:credentials.email}, true)
  .then(profiles=>{
    if(profiles.length == 0){
      res.json({
        confirmation:'fail',
        message:'email not registered, please sign up'
      })
      return
    }

    var profile = profiles[0]

    var passwordCorrect = bcrypt.compareSync(credentials.password, profile.password)

    if(passwordCorrect == false){
      req.rentSyd.reset()
      res.json({
        confirmation:'fail',
        message:'wrong password'
      })
      return
    }
    if(passwordCorrect == true){
      var token = jwt.sign({id:profile._id}, process.env.JWT_TOKEN_SECRET, {expiresIn:4000})
      req.rentSyd.token = token
      res.json({
        confirmation:'success',
        result:profile.summary(),
        token: token
      })
    }

  })
  .catch(err=>{
    res.json({
      confirmation:'fail',
      message:err+''
    })
  })



})

router.get('/logout', function(req, res, next) {
  req.rentSyd.reset()
  res.json({
    confirmation:'success',
    message: 'logged out'
  })
})

module.exports = router
