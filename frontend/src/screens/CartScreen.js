import React, {useEffect}from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useParams,useSearchParams} from 'react-router-dom';
import {Row, Col, ListGroup,Image,Form, Button,Card} from 'react-bootstrap'
import Message from '../components/Message'
import {addToCart} from '../actions/cartActions'


const CartScreen = () => {
  const params=useParams();
  const productId= params.id
  //https://stackoverflow.com/questions/73262988/react-router-v6-history-location-search-replacement
  const [searchParams, setSearchParams]= useSearchParams()
  const qty=searchParams.get("qty")
  console.log(qty)
  
  return (
   <div>Cart</div>
  )
}

export default CartScreen
