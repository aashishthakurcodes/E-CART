import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:[true,"E-mail is required"],
        unique:true,
    },
    password:{
        type:String,
        required:[true, "Password is required"],
    },
    phone:{
        type:String,
        required:true
    },
    role:{
        type:Number,
        default:0
    },
    answer:{
        type:String,
        required:[true,"Choose your Answer"]
    },
    address:{
        type:{},
        required:[true,"Address is required"]
    }

},{timestamps:true})

export default mongoose.model('users',userSchema)

//Users is for creating collections