import z from "zod"
import { Account, User } from "../schema/db.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"
import {JWT_SECRET} from "../config.js"

const SignUpController = async(req,res)=>{
    const {password,username,email} = req.body
    const existingUser = await User.findOne({email})
    if (existingUser) return res.status(411).json({success: false, message:"User is already registered"})
    try {
        const hashPass = bcryptjs.hashSync(password,10)
        const newUser = User({username,email,password:hashPass})
        await newUser.save()
        const userId = newUser._id;
        const newAccount = Account({
            userId,
            balance: 1 + Math.random() * 10000
        })
        await newAccount.save()
        res.json({success:true})
    } catch (error) {
        res.status(401).json({success:false,message: "Something went wrong!"})
    }   
}

const SignInController = async(req,res)=>{
    const email = req.query.email;
    const userPassword = req.query.password;
    const user  = await User.findOne({email})
    try{
        if (!user) return res.status(404).json({success:false,message: 'User not found'})
        const {password,...rest} = user;

        const isMatch = bcryptjs.compareSync(userPassword,user.password)
        if (!isMatch) return res.status(401).json({success:false,message: 'Incorrect password'})
        const token = jwt.sign({rest},JWT_SECRET)
        res.json({success:true,token:token})
    }catch(err){
        return res.status(401).json({success:false,message:"User does not exist",errmeassage:err})
    }
    

}

const UpdateUser = (req,res)=>{
    
}
export {SignUpController,SignInController,UpdateUser}