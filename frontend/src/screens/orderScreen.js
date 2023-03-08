import React, {useEffect,useState} from 'react'
import axios from 'axios'
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer
} from "@paypal/react-paypal-js";
import {useParams} from "react-router-dom"
import{Row,Col,ListGroup,Image,Card, ListGroupItem } from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux';
import Message from '../components/Message'
import { Link } from 'react-router-dom';
import Loader from'../components/Loader'
import {
  ORDER_PAY_RESET
} from '../constants/orderConstants'
import { getOrderDetails,payOrder } from '../actions/orderActions';


// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ clientId, order, currency, onSuccess, showSpinner }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  function run(){
    dispatch({
        type: "resetOptions",
        value: {
          "client-id": clientId,
          components: "buttons",
          currency: currency
        },
    })
  }


  useEffect(() => {run()}, [showSpinner]);
  // console.log("total price: ", order.totalPrice)


  const createOrder = (data,actions) => {
    return actions.order
    .create({
        purchase_units: [
            {
                amount: {
                    currency_code: currency,
                    value: order.totalPrice,
                },
            },
        ],
    })
    .then((orderId) => {
        // Your code here after create the order
        return orderId;
    });
  }

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function () {
        // Your code here after capture the order
        // console.log(data)
        // console.log(actions)
        onSuccess(data);
    });
}


  return (<>
          { (showSpinner && isPending) && <div className="spinner" /> }
          <PayPalButtons
              createOrder={(data, actions) => createOrder(data,actions)}
            // amount={order.totalPrice}
            onApprove={(data, actions) => onApprove(data,actions)}
          />
      </>
  );
}






const OrderScreen = () => {

  const dispatch= useDispatch()
  // const [sdkReady, setSdkReady] = useState(false)
  const [paypalClientID,setPaypalClientID]=useState('')

  const params = useParams()

  const orderDetails=useSelector((state)=>state.orderDetails)
  const {order,loading,error}=orderDetails

  const orderPay = useSelector((state) => state.orderPay)
  const { loading: loadingPay, success: successPay } = orderPay

  // const PAYPAL_CLIENT_ID= async() =>{
  //   const {data:clientId}=await axios.get('/api/config/paypal')
  //   return clientId;
  // }
  useEffect(()=>{
   const updatePaypalClientID=async()=>{
    const {data:clientId}=await axios.get('/api/config/paypal')
    setPaypalClientID(clientId);
   }
   updatePaypalClientID()
  //  setSdkReady(true)
  //  console.log("print id", process.env)
   if(!order||successPay||order._id!==params.id){
    dispatch({type:ORDER_PAY_RESET})
    dispatch(getOrderDetails(params.id))
  }
  //  }else if(!order.isPaid){
  //   setSdkReady(true)
  //    if(!window.paypal){
  //     addPayPalScript()
  //    }else{
  //     setSdkReady(true)
  //    }
   },[dispatch, successPay, order, params.id])
  
  if(!loading){
    //calculate prices
    const addDecimals=(num)=>{
      return (Math.round(num*100)/100).toFixed(2)
    }
    order.itemsPrice=addDecimals(order.orderItems.reduce((acc,item)=>
    acc+item.price*item.qty, 0))
  }
  
  const successPaymentHandler = (paymentResult) => {
    console.log("paymentResult:", paymentResult,params.id)
    dispatch(payOrder(params.id, paymentResult))
  }

  const currency="USD"

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
              {!order.isPaid && (
                <ListGroupItem>
                  {loadingPay && <Loader />}

                  {
                    <PayPalScriptProvider
                        options={{
                            "client-id": paypalClientID,
                            components: "buttons",
                            currency: currency
                        }}
                    >
                      <ButtonWrapper
                                  clientId={paypalClientID}
                                  order={order}
                                  currency={currency}
                                  onSuccess={successPaymentHandler}
                                  showSpinner={true}
                              />
                    </PayPalScriptProvider>
                    }
                 </ListGroupItem>
                  )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
  </>
}

export default OrderScreen
