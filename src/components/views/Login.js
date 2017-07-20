
import React, {Component} from 'react'
import {Field, reduxForm } from 'redux-form'
import {Link } from 'react-router-dom'
import {connect } from 'react-redux'
import actions from '../../actions'

class Login extends Component{

  submit(values){

    this.props.loginUser(values, ()=>{
      this.props.addFlashMessage({
        type:'success',
        text: 'You are logged in now. Welcome back!'
      })
      this.props.history.push('/')
      setTimeout(()=>{
        this.props.clearFlashMessages()
      }, 5000)
    })
  }

  renderField(field){
    const {meta: {touched, error}} = field
    const className=`form-group ${touched && error ? 'has-error' : ''}`
    return(
      <div className={className}>
        <label>{field.label}</label>
        <input className='form-control' type={field.type}
          {...field.input}
          />
          <div className='help-block'>
            {touched?  error: ''}
          </div>
      </div>
    )
  }

  render(){
    const {handleSubmit} = this.props
    return(
      <div className='container'>
        <div style={{paddingTop:'70px'}} className='row'>
          <div className='col-md-6 col-md-offset-3 col-lg-4 col-lg-offset-3 col-sm-8 col-sm-offset-2 col-xs-12'>

            <form onSubmit={handleSubmit(this.submit.bind(this))}>
              <Field
                label='Email'
                name='email' component={this.renderField} type='email'
                 />
              <Field
                label='Password'
                name='password' component={this.renderField} type='password'
                />
              <br />
              <div className='text-center'>
                <button className='btn btn-primary' type='submit' onClick={this.submit.bind(this)}>
                <i className='fa fa-sign-in fa-fw'></i>&nbsp;
                Login</button>
                {'  '}
                <Link className='btn btn-danger' to='/'>
                  <i className='fa fa-times fa-fw'></i>&nbsp;
                Cancel</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const validate = values => {
  const {email, password} = values
  const errors = {}

  if(!email || email.trim() === ''){
    errors.email = 'Email is required'
  }
  if(!password || password.trim() === ''){
    errors.password = 'Password is required'
  }

  return errors
}


const dispatchToProps = (dispatch)=>{
  return{
    loginUser: (params, callback)=> dispatch(actions.loginUser(params, callback)),
    addFlashMessage: (message) => dispatch(actions.addFlashMessage(message)),
    clearFlashMessages: () => dispatch(actions.clearFlashMessages())
  }
}

export default connect(null, dispatchToProps)(reduxForm({
  form: 'loginForm',
  validate
})(Login))
