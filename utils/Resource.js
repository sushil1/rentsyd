module.exports = {

  convertToJson: function(records){
    var results = new Array()
    for(var i=0; i<records.length; i++){
      var p = records[i]
      results.push(p.summary())
    }
    return results
  }

  
}
