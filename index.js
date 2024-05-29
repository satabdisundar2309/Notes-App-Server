require('dotenv').config()
const port = process.env.PORT || 8000
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const dbConnection = require('./dbConnection/dbConnection')
dbConnection();

const userRouter = require('./routes/userRoutes')
const noteRouter = require('./routes/noteRoutes')
app.use('/api/v1', userRouter)
app.use('/api/v1', noteRouter)


app.listen(port, ()=>{
    console.log(`App is listening at port ${port}`)
})