

//mongoose k saath database connect karenge
import mongoose from "mongoose";
//DB_NAME
import { DB_Name } from "../constants.js";

//DB is another continent --> toh async function hoga

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_Name}`)
        console.log(`\n MongoDB Connected !! DB HOST: ${connectionInstance.connection.host}`);
        //isse hame pata chalta hai ki data kaun se host se connect hai
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        //node js hame excess deta hai process ka --> jo current application chal rahi hai process uska reference hai
        process.exit(1);
        //exit is a method  --> alag alag process se hm exit kara sakte hai
        //The shell that execcuted NODEJS should see the exit code as 1
    }
}

export default connectDB;