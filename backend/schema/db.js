import mongoose from 'mongoose';

const user = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    }
})
const account = new mongoose.Schema({
    userId:{ 
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true
    },
    balance:{
        type: Number,
        required: true,
    }
})
const User =  mongoose.model("User",user)
const Account = mongoose.model("Account",account)
export {User,Account}