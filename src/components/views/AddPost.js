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
        <Dropzone style={{border:'none'}}
        name={field.name}
        onDrop={( filesToUpload, e ) => field.input.onChange(filesToUpload)}
        ><button className='btn btn-success btn-lg'><i className='fa fa-cloud-upload'></i>&nbsp;Upload Image</button>
        </Dropzone>
        {field.meta.touched &&
          field.meta.error &&
          <span className="has-error text-danger">{field.meta.error}</span>}
        {files && Array.isArray(files) && (
          <div className='button-group' style={{paddingTop:'10px'}}>
            { files.map((file, i) => <button className='btn btn-info' key={i}><i className='fa fa-picture-o'></i>&nbsp;{file.name}</button>) }
          </div>
        )}

      </div>
    )
  }

  renderInput(field){
    return(
      <div className='form-group'>
        <label>{field.label}</label>
        <br />
        <field.element className={field.inputClass} name={field.name} type={field.type} {...field.input} placeholder={field.placeholder} min={field.min} max={field.max}/>

        {field.meta.touched && field.meta.error && <span className='has-error text-danger'>{field.meta.error}</span>}

      </div>
    )
  }

  renderSelect(field){
    return(
      <div className='input-group margin-left-sm'>
        <span className='input-group-addon'><i className={field.itemIconName}></i></span>
        <select className='form-control' name={field.name} {...field.input}>
          <option>{field.label}</option>
          <option>0</option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
        {field.meta.touched && field.meta.error && <span className='has-error text-danger'>{field.meta.error}</span>}
      </div>
    )
  }


  render(){
    const {handleSubmit} = this.props
    return(
      <div className='container'>
        <div className='row' style={{paddingTop:'70px'}}>
          <h3 style={{textAlign:'center'}}>Add a rental property</h3>
          <div style={{paddingTop:'20px'}} className='col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2 col-sm-8 col-sm-offset-2 col-xs-10 col-xs-offset-1'>
            <form onSubmit={handleSubmit(this.submitForm.bind(this))}>
              <h4>Address:</h4>
              <FormSection className='form-inline' name='address' required>
                <Field name='street' label='Street' element='input' type='text'
                placeholder='40 Streetname St'
                inputClass='form-control'
                component={this.renderInput}
                />
                <Field name='suburb' label='Suburb' element='input' type='text'
                placeholder='North Ryde'
                inputClass='form-control'
                component={this.renderInput}
                />
                <Field name='postcode' label='Postcode' element='input' type='text'
                inputClass='form-control'
                  component={this.renderInput}
                  />
              </FormSection>
              <br />

              <h4>Features:</h4>
              <div className='form-inline'>

                <Field name='beds' label='Beds'
                  itemIconName='fa fa-bed fa-fw'
                  component={this.renderSelect}
                  />
                <Field name='bath' label='Baths'
                  itemIconName='fa fa-bath fa-fw'
                  component={this.renderSelect}
                  />
                <Field name='carpark' label='Carpark'
                  itemIconName='fa fa-car fa-fw'
                  component={this.renderSelect}
                  />
              </div>

              <br />

                <Field name='price' element='input' type='text'
                label='Price'
                inputClass='col-xs-4'
                placeholder='Price per week'
                  component={this.renderInput}
                  />

              <br />
              <Field name='description' label='Write a description' element='textarea' type='text'
              inputClass='form-control'
              placeholder='Write something about your property'
                component={this.renderInput}
                />

              <br />
              <Field name='image' label='Upload a image'
                component={this.renderDropzone}
                />

                <br />
              <div className='text-center'>
                <button className='btn btn-primary' type='submit'><i className='fa fa-paper-plane'></i>&nbsp;{this.state.status}</button>
                {"  "}
                <Link to='/'><button className='btn btn-danger'>
                  <i className='fa fa-times fa-fw'></i>&nbsp;
                Cancel</button></Link>
              </div>
            </form>
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>

    )

  }
}


  function validate(values){
    const errors = {}

    if(!values.price){
      errors.price = 'Enter price'
    }
    if(!values.beds || values.beds == 'Beds'){
      errors.beds = 'Enter beds'
    }
    if(!values.bath || values.bath == 'Baths'){
      errors.bath = 'Enter bath'
    }
    if(!values.carpark || values.carpark == 'Carpark'){
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
