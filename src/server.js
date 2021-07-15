const express = require('express')
require('dotenv').config()
const cors = require('cors')
const {PORT} = process.env
const {connectDB} = require('./db/connectDB')
const apiRoutes = require('./routes/userRoutes')

const app = express()

// Connect with DB
connectDB()

// Middleware
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// Routes
app.use(apiRoutes)

const port = PORT || 4000
app.listen(port, ()=>{
    console.log(`Server running on port ${port}`)
})