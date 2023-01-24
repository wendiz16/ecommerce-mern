import React,{useState, useEffect} from 'react'
import { Link, redirect,useSearchParams, useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import {Row, Col, Button} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux';
import Message from "../components/Message"
import Loader from "../components/Loader"
import { register} from '../actions/userActions';
import FormContainer from '../components/FormContainer';
const RegisterScreen = () => {

  let navigate = useNavigate();
  const [email, setEmail]=useState('')
  const [password, setPassword]=useState('')
  const [searchParams, setSearchParams]= useSearchParams()
  const redirect = [...searchParams][0] ? `/${[...searchParams][0][1]}` : '/'
  const dispatch= useDispatch()
  const userLogin = useSelector(state=>state.userLogin)
  const {loading, error, userInfo}=userLogin
  useEffect(()=>{
    if(userInfo){
      navigate(redirect)
    }
  },[userInfo,redirect])
  const submitHandler=(e)=>{
    e.preventDefault()
    //Dispatch login
    dispatch(login(email,password))
  }
  return (
   <FormContainer>
    <h1>Log In</h1>
    {error&&<Message variant='danger'>{error}</Message>}
    {loading&&<Loader/>}
    <Form onSubmit={submitHandler}>
      <Form.Group controlId='email'>
        <Form.Label>Email Address</Form.Label>
        <Form.Control type='email' placeholder='Enter your email' value={email}
        onChange={(e)=>setEmail(e.target.value)}></Form.Control>
      </Form.Group>

      <Form.Group controlId='password'>
        <Form.Label>Password</Form.Label>
        <Form.Control type='password' placeholder='Enter your password' value={password}
        onChange={(e)=>setPassword(e.target.value)}></Form.Control>
      </Form.Group>
      <Button type='submit' variant='primary' className='my-3'>
        Log In
      </Button>
    </Form>
    <Row className='py-3'>
      <Col>
        New User?<Link to={redirect?`/register?register=${redirect}`:'/register'}>Register</Link>
      </Col>
    </Row>
   </FormContainer>
  )
}

export default RegisterScreen
