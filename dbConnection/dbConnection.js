const mongoose = require("mongoose");
require('dotenv').config();

const dbConnection = ()=>{
    mongoose.connect(process.env.MONGO_URL).then(()=>{
        console.log("DB Connection successfull")
    }).catch((e)=>{
        console.log("Error in DB Connection", e)
    })
}

module.exports = dbConnection;