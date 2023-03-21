import path from 'path'
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import colors from 'colors';
import morgan from 'morgan'
import productRoutes from './Routes/productRoutes.js'
import userRoutes from "./Routes/userRoutes.js"
import orderRoutes from "./Routes/orderRoutes.js"
import uploadRoutes from './Routes/uploadRoutes.js'
import {notFound,errorHandler} from'./middleware/errorMiddleware.js'
dotenv.config()
connectDB()

const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())
app.get('/',(req,res)=>{
  res.send('api is running...')
})
app.use('/api/products',productRoutes)
app.use('/api/users',userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal',(req,res)=>
  {
    res.send(process.env.PAYPAL_CLIENT_ID)
  })

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT||5000
app.listen(5000, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))