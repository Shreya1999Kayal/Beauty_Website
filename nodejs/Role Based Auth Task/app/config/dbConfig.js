
require("dotenv").config()
const mongoose = require("mongoose")
const MONGO_URL = process.env.MONGO_URL


const dbConnection = async()=>{
    try{
        const connectDb =await mongoose.connect(MONGO_URL)
        if(connectDb){
            console.log("Database is successfuly connected.")
        }
        else{
            console.log("Database is not successfully connected.")
        }

    }
    catch(err){
        console.log("Database connection error:", err.message)
    }
}


module.exports = dbConnection