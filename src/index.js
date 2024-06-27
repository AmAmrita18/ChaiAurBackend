// require('dotenv').config({path: './env'})

// improve version
import dotenv from "dotenv"
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDB()

//hmara database asyn fun hai aur asynchronous method jab bhi complete hota hai to ek promise return karta hai
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MongoDB connection!!!", err);
})


/*
//first approach
import express from "express"
//isi index file me kayi baar hm app ko bhi initialize kar lete hai jo  ki express se banti hai
const app = express()

(async() => {
    try{
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        //database jaise connect ho jata hai to kayi baar uske next line me hame listeners dikhti hai
        //app kayi saare event ko listen kar sakti hai --> unme se ek event hai "error"
        app.on("error", () => {
            console.log("ERROR: ", error)
            throw error
        })

        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`)
        })
    } catch(error){
        console.error("Error: ", error)
        throw err
    }
})()
*/