import React, {Component} from 'react'
import {reduxForm, Field, FormSection} from 'redux-form'
import Dropzone from 'react-dropzone'
import {APIClient} from '../../utils'
import sha1 from 'sha1'
import {connect} from 'react-redux'
import actions from '../../actions'
import {Link } from 'react-router-dom'

class AddPost extends Component{
  constructor(){
    super()
    this.state = {
      status: 'Submit'
    }
  }

  submitForm(values){
    values['profile'] = this.props.account.currentUser

    const address = values['address']
    const formattedAddress = address.street+", "+address.suburb+", "+address.postcode


    this.getGeocode(formattedAddress, (res)=>{
       return values['geo'] = [res.lat, res.lng]

    })

    this.setState({
      status: 'Uploading'
    })

    this.uploadImage(values['image'], (res)=>{
      values['image'] = res

      this.setState({
        status: 'Submitting'
      })


      return this.props.addNewPost(values, ()=>{


        this.setState({
          status: 'Done'
        })
        return this.props.history.push('/')

      })



    })

  }

  getGeocode(address, callback){
    APIClient.handleGetGeo('/geocode', {address: address})
    .then(gotGeo=>{
      const location = gotGeo.result
      callback(location)
    })
    .catch(err=>{
      console.log('Error: '+err)
    })
  }


  uploadImage(files, callback){

    const file = files[0]
    //prepare for uploading to cloudinary
    const cloudName = 'snapshot'
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`
    const timestamp = Date.now()/1000
    const uploadPreset = 'tn66cuy3'
    const CLOUDINARY_API_SECRET = 'JqdG19_m_otoDtD_GeJcRaq8sSQ'
    const paramsStr = `timestamp=${timestamp}&upload_preset=${uploadPreset}${CLOUDINARY_API_SECRET}`
    const signature = sha1(paramsStr)
    const apiKey = '895473156114421'
    const params = {
      'api_key': apiKey,
      'timestamp': timestamp,
      'upload_preset': uploadPreset,
      'signature': signature
    }

    APIClient.uploadImage(url, file, params)
    .then(uploaded => {
      const imageUrl = uploaded['secure_url']
      callback(imageUrl)
    })
    .catch(err=>{
      console.log('Error: '+err)
    })


  }


  renderDropzone(field){
    const files = field.input.value
    return(
      <div>
        <Dropzone
        name={field.name}
        onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
        ><strong>Click to Upload</strong>
        </Dropzone>
        {field.meta.touched &&
          field.meta.error &&
          <span className="has-error text-danger">{field.meta.error}</span>}
        {files && Array.isArray(files) && (
          <ul className='list-group'>
            { files.map((file, i) => <li className='list-group-item' key={i}>{file.name}</li>) }
          </ul>
        )}

      </div>
    )
  }

  renderInput(field){
    return(
      <div className='form-group'>
        <label>{field.label}</label>
        <br />
        <field.element className='form-control' name={field.name} type={field.type} {...field.input} min={field.min} max={field.max}/>

        {field.meta.touched && field.meta.error && <span className='has-error text-danger'>{field.meta.error}</span>}

      </div>
    )
  }


  render(){
    const {handleSubmit} = this.props
    return(
      <div className='container'>
      <form style={{paddingTop:'70px'}}  onSubmit={handleSubmit(this.submitForm.bind(this))}>

        <FormSection name='address' required>
          <Field name='street' label='Street' element='input' type='text'
          component={this.renderInput}
          />
          <Field name='suburb' label='Suburb' element='input' type='text'
          component={this.renderInput}
          />
          <Field name='postcode' label='Postcode' element='input' type='text'
            component={this.renderInput}
            />
        </FormSection>

        <Field name='description' label='Write a description' element='textarea' type='text'
          component={this.renderInput}
          />
        <Field name='price' label='Price per week' element='input' type='text'
          component={this.renderInput}
          />
        <Field name='beds' label='Number of bedrooms' element='input' type='number' min='1' max='6'
          component={this.renderInput}
          />
        <Field name='bath' label='Number of bathrooms' element='input' type='number' min='1' max='5'
            component={this.renderInput}
            />
        <Field name='carpark' label='Number of carpark' element='input' type='number' min='0' max='3'
              component={this.renderInput}
              />
        <Field name='image' label='Upload a image'
          component={this.renderDropzone}
          />

          <br />
        <button className='btn btn-success' type='submit'>{this.state.status}</button>
        {"  "}
        <Link to='/'><button className='btn btn-danger'>Cancel</button></Link>
      </form>

    </div>

    )

  }
}


  function validate(values){
    const errors = {}

    if(!values.price){
      errors.price = 'Enter price'
    }
    if(!values.beds){
      errors.beds = 'Enter beds'
    }
    if(!values.bath){
      errors.bath = 'Enter bath'
    }
    if(!values.carpark){
      errors.carpark = 'Enter carpark'
    }
    if(!values.description){
      errors.description = 'Enter description'
    }

    if(!values.image){
      errors.image = 'Upload image to continue'
    }


    return errors

  }

  const stateToProps = (state) => {
    return{
      account: state.account
    }
  }

  const dispatchToProps = (dispatch)=>{
    return{
      addNewPost: (params, callback)=> dispatch(actions.addNewPost(params, callback))
    }
  }

export default connect(stateToProps, dispatchToProps)(reduxForm({
  form: 'addPostForm',
  validate
})(AddPost))
