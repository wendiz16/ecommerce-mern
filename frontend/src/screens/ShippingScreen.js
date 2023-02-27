import React, {useState} from 'react'
import { useNavigate} from "react-router-dom"
import Form from 'react-bootstrap/Form';
import{ Button } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../actions/cartActions';
const ShippingScreen = () => {
  
  const navigate=useNavigate();
  const cart =useSelector(state=>state.cart)
  const {shippingAddress}=cart
  const [address, setAddress] =useState(shippingAddress.address)
  const [city, setCity] =useState(shippingAddress.city)
  const [postalcode, setPostalCode] =useState(shippingAddress.postalcode)
  const [country, setCountry] =useState(shippingAddress.country)
  const dispatch=useDispatch()
  const submitHandler =(e)=>{
   e.preventDefault()
   dispatch(saveShippingAddress({address, city, postalcode,country}))
   navigate('/payment')
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
