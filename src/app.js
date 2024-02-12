import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import httpStatus from 'http-status'
import connectDB from './config/db.js'
import userRoutes from './routes/index.js'
import ApiError from './utils/ApiError.js'
import { errorConverter, errorHandler } from './middlewares/error.js'

const app = express()

connectDB()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Authorization, Content-Type, Accept'
    )
    res.header('Access-Control-Allow-Credentials', true)
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    next()
})

app.use(
    cors({
        allowedHeaders: [
            'Origin',
            'X-Requested-With',
            'Authorization',
            'Content-Type',
            'Accept',
        ],
    })
)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('App is running...')
})

app.use('/api/v1', userRoutes)

app.use((req, res, next) => {
    next(new ApiError('Route not Found', httpStatus.NOT_FOUND))
})

app.use(errorConverter)

app.use(errorHandler)

const port = process.env.PORT || 6000

app.listen(port, () => {
    console.log(`Server is listening on PORT: ${port}`)
})
