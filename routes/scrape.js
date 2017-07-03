var express = require('express')
var router = express.Router()
var superagent = require('superagent')
var cheerio = require('cheerio')
var xml2js = require('xml2js')


router.get('/:suburb/:state/:postcode', function(req, res, next){

  var suburb = req.params.suburb
  var state = req.params.state
  var postcode = req.params.postcode

  var url = `https://www.realestate.com.au/rent/in-${suburb},${state}${postcode}/list-1`

  superagent.get(url)
  .query(null)
  .set('Accept', 'application/json')
  .end(function(err, response){
    if(err){
      res.json({
        confirmation:'fail',
        message: `${suburb}${state}${postcode} not found`+err
      })
      return
    }



    //$ = cheerio.load(response.text)

      //<div class='media'>
        // <a href='/property-townhouse-nsw-north+ryde-421452702'\n                                   >
        // <img data-src='https://i2.au.reastatic.net/640x480/820a04b3a23f586f52eb9bf50b662a00e3c06c6661df391e07e10fe0b90a34b4/main.jpg' src='https://i2.au.reastatic.net/640x480/820a04b3a23f586f52eb9bf50b662a00e3c06c6661df391e07e10fe0b90a34b4/main.jpg' alt='103b Coxs Road, North Ryde, NSW 2113' title=\"103b Coxs Road, North Ryde, NSW 2113\" width=\"640\" height=\"480\" />
        // </a>
        // </div>





    res.json({
      confirmation:'success',
      result: response.text
    })
  })
})



module.exports = router
