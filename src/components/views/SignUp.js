import React, {Component} from 'react'
import {Field, reduxForm } from 'redux-form'
import {Link } from 'react-router-dom'
import {connect } from 'react-redux'
import actions from '../../actions'

class SignUp extends Component{

  submit(values){

    this.props.registerUser(values, ()=>{
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
        label='Name'
        name='name' type='text'
        component={this.renderField}
         />
        <Field
          label='Email' type='email'
          name='email' component={this.renderField}
           />
        <Field
          label='Password' type='password'
          name='password' component={this.renderField}
          />
        <br />
        <button className='btn btn-primary"' type='submit' onClick={this.submit.bind(this)}>SignUp</button>
        {'  '}
        <Link className='btn btn-danger' to='/'>Cancel</Link>
      </form>
    )
  }
}

const validate = values => {
  const {name, email, password} = values
  const errors = {}
  if(!name || name.trim() === ''){
    errors.name = 'Enter your name'
  }
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
    registerUser: (params, callback)=> dispatch(actions.registerUser(params, callback))
  }
}

export default connect(null, dispatchToProps)(reduxForm({
  form: 'signupForm',
  validate
})(SignUp))
