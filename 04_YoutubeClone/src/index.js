// require('dotenv').config({path: './env'})

import dotenv from "dotenv"
import connectDB from "./db/index.js";


dotenv.config({
    path: './env'
})
 
connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port ${process.env.PORT}.`);
    })
})
.catch(err => {
    console.log("MongoDB Connection Failed: ", err)
})


















/*
// --------Connect to MongoDB----------

import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";
import express from "express";
const app = express();

( async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB Connected || DB Host: ${connectionInstance.connection.host}`);
        app.on("error", (error)=>{
            console.log("Express ERROR: ", error);
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}.`);
        });
    } catch (error) {
        console.error("MongoDB ERROR: ", error);
        throw error
    }
})()

*/
