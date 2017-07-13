import superagent from 'superagent'
import Promise from 'bluebird'

//lets queue the GET requests

//var queue = []



export default {

  get: (endpoint, params)=>{
    return new Promise((resolve, reject)=>{
      // if(queue.indexOf(endpoint) != -1){
      //   return // request is already running
      // }
      // queue.push(endpoint)

      superagent
      .get(endpoint)
      .query(params)
      .set('Accept', 'application/json')
      .end((err, response)=>{
        // let index = queue.indexOf(endpoint)
        // queue.splice(index, 1)

        if(err){
          reject(err)
          return
        }
        if(!response.body){
          reject(new Error('message: '+'No response'))
        return}
        if(response.body.confirmation !== 'success'){
          reject(new Error(response.body.message))
        return
      }
        resolve(response.body)
      })
    })
  },

  post: (endpoint, params)=>{
    return new Promise((resolve, reject)=>{
      superagent
      .post(endpoint)
      .send(params)
      .set('Accept', 'application/json')
      .end((err, response)=>{
        if(err){
          reject(err)
          return
        }
        if(response.body.confirmation !== 'success'){
          reject(new Error(response.body.message))
        return
      }
        resolve(response.body)
      })
    })
  },

  handleGetGeo: (endpoint, params)=>{
    return new Promise((resolve, reject)=>{
      superagent.get(endpoint)
      .query(params)
      .set('Accept','application/json')
      .end((err, response)=>{
        if(err){
          reject(err)
          return
        }
        if(response.body.confirmation == 'fail'){
          reject(new Error(response.body.message))
        return
      }
        resolve(response.body)
      })

    })
  },


  handleDelete: (endpoint)=>{
    return new Promise((resolve, reject)=>{
      superagent
      .delete(endpoint)
      .end((err, response)=>{
        if(err){
          reject(err)
        }
        if(response.body.confirmation == 'fail'){
          reject(new Error(response.body.message))
        return
      }
				resolve(response.body)
      })
    })
  },

  uploadImage: (url, file, params)=>{
    return new Promise((resolve, reject)=>{

      let uploadRequest = superagent.post(url)
      uploadRequest.attach('file', file)

      if(params != null){
        console.log(JSON.stringify(params))
        Object.keys(params).forEach(key=>{
          uploadRequest.field(key, params[key])
        })
      }

      uploadRequest.end((err, response)=>{
        if(err){
          reject(err)
          return
        }
        if(response.body.confirmation == 'fail'){
          reject(new Error(response.body.message))
        return
      }
        resolve(response.body)
      })
    })
  }


}
