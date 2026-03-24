require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URL = process.env.MONGO_URL;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY

if(!MONGO_URL){
    throw new Error("MONGO_URL is not defined in environment variables.")
}

if(!JWT_SECRET_KEY){
    throw new Error("JWT_SECRET_KEY is not defined in environment variables.")
}


const DatabaseConnection=async()=>{
    try {
        const connect = await mongoose.connect(MONGO_URL);
        if (connect){
            console.log("Database is connected.");
        }else{
            console.log("Database is not connected.");
        }
       
    } catch (error) {
        console.log(error);
    }
}


module.exports=DatabaseConnection;