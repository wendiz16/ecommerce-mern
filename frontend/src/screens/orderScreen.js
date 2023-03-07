import React, {useEffect,useState} from 'react'
import axios from 'axios'
import {useParams} from "react-router-dom"
import{ Button, Row,Col,ListGroup,Image,Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux';
import Message from '../components/Message'
import { Link } from 'react-router-dom';
import Loader from'../components/Loader'
import { getOrderDetails } from '../actions/orderActions';
const OrderScreen = () => {

  const dispatch= useDispatch()
  const [sdkReady, setSdkReady] = useState(false)
  const params = useParams()

  const orderDetails=useSelector((state)=>state.orderDetails)
  const {order,loading,error}=orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  useEffect(()=>{
   const addPayPalScript=async()=>{
    const {data:clientId}=await axios.get('/api/config/paypal')
    const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
      script.async = true
      script.onload = () => {
        setSdkReady(true)
      }
      document.body.appendChild(script)
   }
   
   if(!order||successPay||order._id!==params.id){
    dispatch(getOrderDetails(params.id))
   }else if(!order.isPaid){
     if(!window.paypal){
      addPayPalScript()
     }else{
      setSdkReady(true)
     }
   }
  },[dispatch, successPay, order, params.id])
  
  if(!loading){
    //calculate prices
    const addDecimals=(num)=>{
      return (Math.round(num*100)/100).toFixed(2)
    }
    order.itemsPrice=addDecimals(order.orderItems.reduce((acc,item)=>
    acc+item.price*item.qty, 0))
  }


  return  loading?<Loader/>:error?<Message variant='danger'>
   {error}
  </Message>:<>
  <h1>Order {order._id}</h1>
  <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroupItem>
              <h2>Shipping</h2>
              <p><strong>Name:</strong> {order.user.name}</p>
              <p><strong>Email:</strong>{' '}
              <a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
              <p>
                <strong>Address:</strong>
                {order.shippingAddress.address}, {order.shippingAddress.city} {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </p>
              {order.isDelivered?(
                <Message variant='success'>Delivered on {order.deliveredAt} </Message>
              ):(
                <Message variant='danger'>Not Delivered</Message> 
              )}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Payment Method</h2>
              <p>
              <strong>Method:</strong>
              {order.paymentMethod}
              </p>
              {order.isPaid?(
                <Message variant='success'>Paid on {order.paidAt} </Message>
              ):(
                <Message variant='danger'>Not Paid</Message> 
              )}
            </ListGroupItem>

            <ListGroupItem>
              <h2>Order Items</h2>
              {order.orderItems.length===0? <Message>Your order is empty</Message>:(
               <ListGroup variant='flush'>
                {
                  order.orderItems.map((item, index)=>(
                    <ListGroupItem key={index}>
                      <Row>
                        <Col md={1}>
                          <Image src={item.image} alt={item.name}
                          fluid rounded/>
                        </Col>
                        <Col>
                         <Link to={`/product/${item.product}`}>
                          {item.name}
                         </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x $ {item.price} = $ {item.qty*item.price}
                        </Col>
                      </Row>
                    </ListGroupItem>
                  ))
                }
               </ListGroup>
              )}
            </ListGroupItem>
          </ListGroup>
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroupItem>
                <h2>Order Summary</h2>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col>Items</Col>
                  <Col>${order.itemsPrice}</Col>
                </Row>
              </ListGroupItem>
              
              <ListGroupItem>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${order.shippingPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Tax</Col>
                  <Col>${order.taxPrice}</Col>
                </Row>
              </ListGroupItem>

              <ListGroupItem>
                <Row>
                  <Col>Total</Col>
                  <Col>${order.totalPrice}</Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </Card>
        </Col>
      </Row>
  </>
}

export default OrderScreen
