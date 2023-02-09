import React,{useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import {Row, Col, Button} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux';
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getUserDetails,updateUserProfile} from '../actions/userActions';

const ProfileScreen = () => {
  
  let navigate = useNavigate();
  // let location= useLocation();
  // let url = location.search
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

  const userUpdate= useSelector((state)=>state.userUpdate)
  const {success}=userUpdate
  useEffect(()=>{
    if(!userInfo){
      navigate('/login')
    }else{
      if(!user.name){
        dispatch(getUserDetails('profile'))
      }else{
        setName(user.name)
        setEmail(user.email)
      }
    }
  },[dispatch, navigate, userInfo,user])
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
      //dispatch updateproflie 
      dispatch(updateUserProfile({id:user._id,name, email, password}))
    }
  }
  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message &&<Message variant='danger'>{message}</Message>}
       {error &&<Message variant='danger'>{error}</Message>}
       {success &&<Message variant='success'>Profile Updated</Message>}
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
        Update
      </Button>
     </Form>
        
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>

  )
}

export default ProfileScreen
