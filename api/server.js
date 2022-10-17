import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import studentRoute from './routes/studentRoutes.js'
import userRoute from './routes/userRoutes.js'
import productRoute from './routes/productRoute.js'
import categorytRoute from './routes/categoryRoute.js'
import tagRoute from './routes/tagRoute.js'
import mongoDbConnection from './config/db.js';
import errorHandler from './middleware/errorHandler.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
// import formidable from 'express-formidable'


// express init 

const app= express();

//env config
dotenv.config()


//middlewares 

app.use(express.json())
app.use(express.urlencoded({extended:false}))
// app.use(formidable())
app.use(cookieParser())
app.use(cors())

//env manage
const PORT= process.env.SERVER_PORT;

//static folder 

app.use(express.static('api/public'))

//routes 
app.use('/api/v1/product', productRoute)
app.use('/api/v1/tag', tagRoute)
app.use('/api/v1/category', categorytRoute)
app.use('/api/student', studentRoute)
app.use('/api/user', userRoute)


// custom error initialize 

app.use(errorHandler)

//listen server
app.listen(PORT, () => {
    mongoDbConnection()
    console.log(`Server is running on Port ${PORT}`.bgGreen.black);
})