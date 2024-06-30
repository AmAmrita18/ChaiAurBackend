import express from "express"
import cors from "cors";
import cookieParser from "cookie-parser";

//express se app banti h
const app = express()

//configure app banne ke baad hota hai
//use method middleware ya configure krne ke use me aata hai
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

//iska matlab mai json file ko accept kar rhe hai
app.use(express.json({limit: "16kb"}))

//yeh url ko encode karta hai taaki special character k wajah se koi issue na aaye issue 
app.use(express.urlencoded({extended: true,
    limit:"16kb"
}))



//jab hm files ya folder store karna chahte hai to hm static use karte h--> yaha asset ka naam public h...
app.use(express.static("public"))

//cookie parser ka kaam h server se cookies access karna -->basically CRUD operation karna
app.use(cookieParser())

//routes import
import userRouter from './routes/user.routes.js'

//routes declaration
app.use("/api/v1/users", userRouter)
// http://localhost:8000/api/v1/users/register

export { app }

