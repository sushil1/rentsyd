var express = require('express')
var router = express.Router()
var superagent = require('superagent')

router.get('/', function(req, res, next){


  var address = req.query.address
  console.log(address)
  var url = `https://maps.googleapis.com/maps/api/geocode/json`

  superagent.get(url)
  .query({address: address})
  .set('key','AIzaSyBOwZZ_D1l-20cXhdFiGtrV5azGDEADNeM')
  .set('Accept', 'application/json')
  .end(function(err, response){
    if(err || (response.body.status !== 'OK')){
      res.json({
        confirmation:'fail',
        message: err +''
      })
      return
    }
      res.json({
        confirmation:'success',
        result: response.body.results[0]['geometry']['location']
      })
  })

})

module.exports = router
