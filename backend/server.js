const express = require('express')
const colors = require('colors')
const connectDB = require('./config/db')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const port = process.env.PORT || 3000

connectDB()

//ejemplo de cambio

const app = express()

app.use(express.json())

app.use(express.urlencoded({extended : false}))

app.use('/api/Autos', require('./routes/autosRoutes'))
app.use('/api/AutosUsers', require('./routes/userRoutes'))

app.use(errorHandler)

app.listen( port , ()=> console.log(`Server iniciado en el puerto ${port}`))