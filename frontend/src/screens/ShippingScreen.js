import React, {useState} from 'react'
import { useNavigate} from "react-router-dom"
import Form from 'react-bootstrap/Form';
import{ Button } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
const ShippingScreen = () => {
  const [address, setAddress] =useState('')
  const [city, setCity] =useState('')
  const [postalcode, setPostalCode] =useState('')
  const [country, setCountry] =useState('')

  const submitHandler =(e)=>{
   e.preventDefault()
   console.log('submit')
  }
  return (
    <FormContainer>
     <h1>Shipping</h1>
     <Form onSubmit={submitHandler}>
     <Form.Group controlId='address'>
      <Form.Label>Address</Form.Label>
      <Form.Control
      type='text'
      placeholder='Enter Address'
      value={address}
      required
      onChange={(e)=>setAddress(e.target.value)}>
      </Form.Control>
     </Form.Group>

     <Form.Group controlId='city'>
      <Form.Label>Address</Form.Label>
      <Form.Control
      type='text'
      placeholder='Enter city'
      value={city}
      required
      onChange={(e)=>setCity(e.target.value)}>
      </Form.Control>
     </Form.Group>

     <Form.Group controlId='postalcode'>
      <Form.Label>PostalCode</Form.Label>
      <Form.Control
      type='text'
      placeholder='Enter PostalCode'
      value={postalcode}
      required
      onChange={(e)=>setPostalCode(e.target.value)}>
      </Form.Control>
     </Form.Group>

     <Form.Group controlId='country'>
      <Form.Label>Country</Form.Label>
      <Form.Control
      type='text'
      placeholder='Enter Country'
      value={country}
      required
      onChange={(e)=>setCountry(e.target.value)}>
      </Form.Control>
     </Form.Group>
     <Button type='submit' variant='primary' className='my-3'>
      Continue
     </Button>
     </Form>
    </FormContainer>
  )
}

export default ShippingScreen
