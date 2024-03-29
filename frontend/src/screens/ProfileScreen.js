import React,{useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom"
import Form from 'react-bootstrap/Form';
import {LinkContainer} from 'react-router-bootstrap'
import {Table, Row, Col, Button} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux';
import Message from "../components/Message"
import Loader from "../components/Loader"
import { getUserDetails,updateUserProfile} from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions'; 
import { USER_UPDATE_RESET } from '../constants/userConstants'
const ProfileScreen = () => {
  
  let navigate = useNavigate();
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

  const orderMyList= useSelector((state)=>state.orderMyList)
  const {loading:loadingOrders, error:errorOrders, orders}=orderMyList
  
  
  useEffect(()=>{
    if(!userInfo){
      navigate('/login')
    }else{
      if(!user.name||!user||success){
        dispatch({ type: USER_UPDATE_RESET })
        dispatch(getUserDetails('profile'))
        dispatch(listMyOrders())
      }else{
        setName(user.name)
        setEmail(user.email)
      }
    }
  },[dispatch, navigate, userInfo,user, success])
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
        {loadingOrders?<Loader/>:errorOrders?<Message variant='danger'>{errorOrders}</Message>:(
          <Table striped bordered hover responsive className='table-sm'>
           <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
           </thead>
           <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className='btn-sm' variant='light'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>

  )
}

export default ProfileScreen
