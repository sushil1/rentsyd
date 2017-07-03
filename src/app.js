import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import store from './stores'
import {Provider } from 'react-redux'
import { BrowserRouter, Route, Switch} from 'react-router-dom'
import {Account, Post, MapNavigation} from './components/containers'
import {NavBar, SignUp, PostDetail, AddPost, Login } from './components/views'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin()


class App extends Component{
  render(){
    return(
      <Provider store={store.initializeStore()}>
        <MuiThemeProvider>
        <BrowserRouter>
          <div>
            <Route path='/' component={NavBar} />
            <Switch>
            <Route path='/post/new' component={AddPost} />
            <Route path='/post/:id' component={PostDetail} />
            <Route path='/signup' component={SignUp} />
            <Route path='/login' component={Login} />

            <Route exact path='/' component={Post} />
            </Switch>
          </div>
        </BrowserRouter>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))


export default App
