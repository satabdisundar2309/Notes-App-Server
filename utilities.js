const jwt = require("jsonwebtoken")
require('dotenv').config()

const authenticateToken = async (req, res, next)=>{
    const authHeader = req.header("Authorization")
    if(!authHeader){
        return res.status(401).json({
            error: true,
            message: "Token missing"
        })
    }
    const token = authHeader.split(" ")[1]

    if(!token){
        return res.status(401).json({
            error: true,
            message: "Token missing"
        });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
        if(err){
            return res.status(401).json({
                error: true,
                message: "Invalid token..."
            });
        }
        req.user = user;
        next();
    })
}

module.exports = authenticateToken;