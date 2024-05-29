const express = require('express')
const userRouter = express.Router()

userRouter.get('/', (req, res)=>{
    res.json({
        message: "Grasiasasssssssss........."
    })
})
const authenticateToken = require("../utilities");
const { createAccount, login, getUser } = require('../controllers/userController')
userRouter.post('/create-account', createAccount)
userRouter.post('/login', login)
userRouter.get('/get-user',authenticateToken, getUser)



module.exports = userRouter;