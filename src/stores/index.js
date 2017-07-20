import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {postReducer, accountReducer, flashReducer } from '../reducers'
import {reducer as formReducer} from 'redux-form'

var store;

export default {

  initializeStore: ()=>{
    const reducers = combineReducers({
      form: formReducer,
      post: postReducer,
      account: accountReducer,
      flashMessages: flashReducer
    })

    store = createStore(
      reducers,
      applyMiddleware(thunk)
    )

    return store
  },

  currentStore: ()=>{
    return store
  }
}
