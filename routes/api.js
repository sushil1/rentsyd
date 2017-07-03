var express = require('express')
var router = express.Router()
var controllers = require('../controllers')


router.get('/:resource', function(req, res, next){
  var resource = req.params.resource
  var controller = controllers[resource]

  if(controller == null){
    res.json({
      confirmation: 'fail',
      message:'Invalid resource'
    })
    return
  }
  controller.get(req.query, false)
  .then(function(result){
    res.json({
      confirmation: 'success',
      result: result
    })
  })
  .catch(function(err){
    res.json({
      confirmation:'fail',
      message:err+''
    })
  })

})

router.get('/:resource/:id', function(req, res, next){
  var resource = req.params.resource
  var controller = controllers[resource]

  if(controller == null){
    res.json({
      confirmation: 'fail',
      message:'Invalid resource'
    })
    return
  }

  var id = req.params.id
  controller.getById(id)
  .then(function(result){
    res.json({
      confirmation: 'success',
      result: result
    })
  })
  .catch(function(err){
    res.json({
      confirmation:'fail',
      message: 'No id found: '+err
    })
  })

})


router.post('/:resource', function(req, res, next){
  var resource = req.params.resource
  //toLowerCase().trim()
  var controller = controllers[resource]

  if(controller == null){
    res.json({
      confirmation: 'fail',
      message:'Invalid resource'
    })
    return
  }
  controller.post(req.body, false)
  .then(function(result){
    res.json({
      confirmation: 'success',
      result: result
    })
  })
  .catch(function(err){
    res.json({
      confirmation:'fail',
      message:err
    })
  })

})

router.delete('/:resource/:id', function(req, res, next){
  var resource = req.params.resource
  var id = req.params.id
  var controller = controllers[resource]

  if(controller == null){
    res.json({
      confirmation: 'fail',
      message:'Invalid resource'
    })
    return
  }

  controller.delete(id)
  .then(function(){
    res.json({
      confirmation: 'success',
      result: id
    })
  })
  .catch(function(err){
    res.json({
      confirmation:'fail',
      message:err
    })
  })

})

module.exports = router
