import axios from 'axios'
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL
} from "../constants/productConstants"

export const listProducts=()=> async(dispatch)=>{
  console.log("listProducts: dispatch")
 try {
  
  dispatch({type:PRODUCT_LIST_REQUEST})
  const { data } =await axios.get('/api/products')
  dispatch({
    type:PRODUCT_LIST_SUCCESS,
    payload:data
  })
  // throw new Error ('Some error')

  console.log("dispatch: in try state")

 }
 catch(error){
  console.log("dispatch: in catch error state")
  dispatch({
    type:PRODUCT_LIST_FAIL,
    payload:error.response && error.response.data.message ?
    error.response.data.message:error.message
  })
 }
}