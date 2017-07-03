
import React, {Component} from 'react'
import {Field, reduxForm } from 'redux-form'
import {Link } from 'react-router-dom'
import {connect } from 'react-redux'
import actions from '../../actions'

class Login extends Component{

  submit(values){

    this.props.loginUser(values, ()=>{
      return this.props.history.push('/')
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
      <form style={{paddingTop:'70px'}} className='col-md-6 col-sm-6 col-xs-12 col-lg-6' onSubmit={handleSubmit(this.submit.bind(this))}>
        <Field
          label='Email'
          name='email' component={this.renderField} type='email'
           />
        <Field
          label='Password'
          name='password' component={this.renderField} type='password'
          />
        <br />
        <button className='btn btn-primary"' type='submit' onClick={this.submit.bind(this)}>Login</button>
        {'  '}
        <Link className='btn btn-danger' to='/'>Cancel</Link>
      </form>
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
    loginUser: (params, callback)=> dispatch(actions.loginUser(params, callback))
  }
}

export default connect(null, dispatchToProps)(reduxForm({
  form: 'loginForm',
  validate
})(Login))
