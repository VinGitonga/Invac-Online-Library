import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import colors from 'colors'
import bodyParser from 'body-parser'
import user from './routes/user.js'
import book from './routes/book.js'
import category from './routes/category.js'
import config from './config/config.js'
import connectDB from './config/db.js'
import path from 'path'
// import Pusher from 'pusher'
import mongoose from 'mongoose'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'


// configure the .env variables
dotenv.config()

// Connects to the database
connectDB()



const app = express()

//  for minimal output. :method :url :status :res[content-length] - :response-time ms

if (config.env){
    app.use(morgan('dev'))
}

app.use(express.json())
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({extended: true}))
app.use(cors())
app.use('/api/users', user)
app.use('/api/books1', book)
app.use('/api/categories', category)

const __dirname = path.resolve()

if(config.env === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')))

    app.get('*', async(req, res)=>{
        res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
    })
} else {
    app.get('/', (req, res)=>{
        res.send('API is running ...')
    })
}

app.use(notFound)
app.use(errorHandler)

app.use((req, res, next) => {
    res.header({"Access-Control-Allow-Origin": "*"});
    next();
  })

const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
    )
)
