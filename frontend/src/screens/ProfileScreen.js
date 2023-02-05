import React,{useState, useEffect} from 'react'
import { Link, useNavigate, useLocation} from "react-router-dom"
import Form from 'react-bootstrap/Form';
import {Row, Col, Button} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux';
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getUserDetails} from '../actions/userActions';

const ProfileScreen = () => {
  
  let navigate = useNavigate();
  let location= useLocation();
  let url = location.search
  const [name, setName]=useState('')
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const [confirmPassword, setConfirmPassword]=useState('')
  const [message, setMessage]=useState(null)
 
  const dispatch= useDispatch()
  const userDetails= useSelector((state)=>state.userDetails)
  const {loading, error, user}=userDetails
  
  const userLogin= useSelector((state)=>state.userLogin)
  const {userInfo}=userLogin
  useEffect(()=>{
    if(userInfo){
      navigate('/login')
    }
  },[navigate, userInfo,redirect])
  const submitHandler=(e)=>{
    e.preventDefault()
    // console.log(location)
    //Dispatch register
    if(!name&!password&!email&!confirmPassword){
      setMessage('please enter your info')
    } 
    if(password!==confirmPassword){
      setMessage("Passwords do not match")
    }else{
      dispatch(register(name, email, password ))
    }
  }
  return (
   <FormContainer>
    <h1>Sign Up</h1>
    {message &&<Message variant='danger'>{message}</Message>}
    {error &&<Message variant='danger'>{error}</Message>}
    {loading &&<Loader/>}
    <Form onSubmit={submitHandler}>
      <Form.Group controlId='name'>
        <Form.Label>Name</Form.Label>
        <Form.Control type='name' placeholder='Enter your name' value={name}
        onChange={(e)=>setName(e.target.value)}></Form.Control>
      </Form.Group>
      
      <Form.Group controlId='email'>
        <Form.Label>Email</Form.Label>
        <Form.Control type='email' placeholder='Enter your email' value={email}
        onChange={(e)=>setEmail(e.target.value)}></Form.Control>
      </Form.Group>

      <Form.Group controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' placeholder='Enter your password' value={password}
        onChange={(e)=>setPassword(e.target.value)}></Form.Control>
      </Form.Group>

      <Form.Group controlId='confirmPassword'>
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control type='password' placeholder='Confirm your password' value={confirmPassword}
        onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>
      </Form.Group>
      <Button type='submit' variant='primary' className='my-3'>
        Register
      </Button>
    </Form>
    <Row className='py-3'>
      <Col>
        Registered Already?{' '}
        <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>LogIn</Link>
      </Col>
    </Row>
   </FormContainer>
  )
}

export default ProfileScreen
