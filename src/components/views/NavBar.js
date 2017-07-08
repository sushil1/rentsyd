import React, {Component} from 'react'
import {Link } from 'react-router-dom'
import {connect} from 'react-redux'
import actions from '../../actions'

import RaisedButton from 'material-ui/RaisedButton'
import AppBar from 'material-ui/AppBar'
import TextField from 'material-ui/TextField'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import RadioButton from 'material-ui/RadioButton'


class NavBar extends Component{

  constructor(){
    super()
    this.state = {
      searchForm: {
        suburb: '',
        beds:'',
        bath:''
      }
    }
  }

  searchSubmit(event){
    event.preventDefault()
    if(this.state.searchForm.suburb.trim().length == 0){
      return
    }
    if(this.state.searchForm.beds.length == 0){
      return
    }
    if(this.state.searchForm.bath.length == 0){
      return
    }

    this.props.searchPosts(this.state.searchForm)
  }


  submitLogout(event){
    event.preventDefault()
    var currentUser = this.props.account.currentUser
    this.props.logout(currentUser, ()=>{
      this.props.history.push('/')
    })
  }

  updateField(event){
    let updated = Object.assign({}, this.state.searchForm)
    updated[event.target.id] = event.target.value
    this.setState({
      searchForm: updated
    })
  }

  componentDidMount(){
    this.props.getCurrentUser()
  }


  render(){
    const currentuser = this.props.account.currentUser

    const displayUser = (currentuser == null)? (
      <li className='nav-item dropdown' role='presentation'>
        <a className="dropdown-toggle navbar-item" data-toggle='dropdown' style={{textDecoration:'none'}}><i className='fa fa-user-circle-o fa-2x'></i>&nbsp;<i className='fa fa-caret-down fa-lg'></i></a>
        <ul className='dropdown-menu'>
          <li className='nav-item'><Link to='/signup'>
            <i className='fa fa-user-plus fa-fw'></i>&nbsp;
          SignUp</Link></li>
          <li className='nav-item'><Link to='/login'>
          <i className='fa fa-sign-in fa-fw'></i>&nbsp;Login</Link></li>
          </ul>
      </li>
      )
       :
      (
      <li>
      <ul className='nav nav-pills'>
        <li className='nav-item' style={{paddingTop:'4px'}}><Link to='/post/new'><i className='fa fa-plus fa-lg fa-fw'></i></Link></li>

      <li className='nav-item dropdown' role='presentation'>
        <a className="dropdown-toggle navbar-item" data-toggle='dropdown' style={{textDecoration:'none'}}><i className='fa fa-user-circle fa-2x'></i>&nbsp;<i className='fa fa-caret-down fa-lg'></i></a>
        <ul className='dropdown-menu'>
          <li><a>{currentuser.name}</a></li>
          <li>
            <Link to='/post/new'><i className='fa fa-plus fa-fw'></i>&nbsp;Add a Post</Link>
          </li>
          <li>
            <a onClick={this.submitLogout.bind(this)}><i className='fa fa-sign-out fa-fw'></i>&nbsp;Logout</a>
          </li>
        </ul>
      </li>


      </ul>
      </li>
      )

    return(

      // <AppBar title='rentSyd'
      //   iconClassNameRight='muidocs-icon-navigation-expand-more'>
      // </AppBar>
      //
      // <div className='container'>
      // <div className='row'>
      // <div className='col-md-4'>
      // <TextField
      //   hintText='North Ryde'
      //   floatingLabelText="Suburb"
      //    />
      // </div>
      // <div className='col-md-4'>
      // <SelectField
      //   floatingLabelText="Beds"
      //   style={styles.customWidth}
      //   value={this.state.searchForm.beds}
      //   onChange={(e, index, value)=> this.setState({searchForm :{beds: index+1}})}
      //   style={styles.customWidth}
      //   >
      //   <MenuItem value={1} primaryText="1" />
      //   <MenuItem value={2} primaryText="2" />
      //   <MenuItem value={3} primaryText="3" />
      //   <MenuItem value={4} primaryText="4" />
      //   <MenuItem value={5} primaryText="5" />
      // </SelectField>
      // <SelectField
      //   floatingLabelText="Baths"
      //   style={styles.customWidth}
      //   value={this.state.searchForm.bath}
      //   onChange={(e, index, value)=> this.setState({searchForm :{bath: index+1}})}
      //   style={styles.customWidth}
      //   >
      //   <MenuItem value={1} primaryText="1" />
      //   <MenuItem value={2} primaryText="2" />
      //   <MenuItem value={3} primaryText="3" />
      //   <MenuItem value={4} primaryText="4" />
      //   <MenuItem value={5} primaryText="5" />
      // </SelectField>
      // </div>
      // <div className='col-md-4'>
      // <RaisedButton label='Search' />
      // </div>
      // </div>
      // </div>
    <div>
      <nav className='navbar navbar-default navbar-fixed-top' >
        <div className='container'>
          <div className='navbar-header'>
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
               <span className="icon-bar"></span>
               <span className="icon-bar"></span>
               <span className="icon-bar"></span>
             </button>
             <Link to='/' className='navbar-brand'><strong>rentSyd</strong></Link>
          </div>

            <div className="collapse navbar-collapse" id="navbar-collapse-1">

            <ul className='nav navbar-right'>
                  {displayUser}
            </ul>

            <form className="navbar-form form-inline navbar-left">

              <div className="input-group">
                <span className="input-group-addon"><i className="fa fa-map-marker fa-fw"></i></span>
                <input id='suburb' className="form-control" onChange={this.updateField.bind(this)} type="text" placeholder="Suburb"/>
              </div>

              <div className="input-group margin-left-sm">
                <span className="input-group-addon"><i className="fa fa-bed fa-fw"></i></span>
                <select id='beds' onChange={this.updateField.bind(this)} className="form-control">
                  <option>Beds</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>

              <div className="input-group margin-left-sm">
                <span className="input-group-addon"><i className="fa fa-bath fa-fw"></i></span>
                <select id='bath' onChange={this.updateField.bind(this)} className="form-control">
                  <option>Bath</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>


              <div className="input-group ">
                <button className='btn btn-default'   onClick={this.searchSubmit.bind(this)}>
                  Search
                </button>
              </div>

            </form>

            </div>

        </div>
      </nav>
    </div>
    )
  }
}


const stateToProps = (state) =>{
  return {
    account: state.account
  }
}

const dispatchToProps = (dispatch)=>{
  return{
    getCurrentUser: () => dispatch(actions.getCurrentUser()),
    searchPosts: (params)=> dispatch(actions.searchPosts(params)),
    logout: (params, callback)=> dispatch(actions.logoutUser(params, callback))
  }
}

export default connect(stateToProps, dispatchToProps)(NavBar)
