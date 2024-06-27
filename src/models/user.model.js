import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true
            //agar hme kisi bhi field ko searchable bnana hai optimized tareeke se to uska index true kar do 
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, //cloudinary URL
            required: true
        },
        coverImage: {
            type: String, //cloudinary URL
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps:true
    }
)

//pre hooks
//yaha agar hm direct arrow function use karenge to dikkat aa sakti h, kyuki arrow function k paas this ka reference nahi hota hai aur hme uska context nahi pata hota aur hme yaha context pata hona bahut jaroori hai, kyuki save event user par chal raha h aur userSchema k andar hmne jo sab likha h , inka access lagega
//isliye function use kar ke likha jata h
//ye encryption complex h, time leta hai...isliye is function ko async liya jata hai
//kyuki middle ware h, to next ka access hona chahiye
//fir end me next ko call karna padta hai i.e. flag ab aage pass kar do
userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();

    this.password = bcrypt.hash(this.password, 10)
    next()
})

//custom methods
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}
//both are JWT tokens bas uses ka antar hai ki hm kisko kaise use karte hai
userSchema.methods.generateAccessToken = function(){
    //sign method token generate kar dega
    return jwt.sign(
        {
            //payload
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        //accesstoke
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            //payload
            _id: this._id,
        },
        //accesstoke
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)