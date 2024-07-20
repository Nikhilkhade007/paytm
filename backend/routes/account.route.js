
import { Router } from "express"
import { authMiddleware } from "../middleware/auth.middleware.js";
import { Account } from "../schema/db.js";
import mongoose from "mongoose";

const router = Router()

router.get("/balance",authMiddleware,async (req,res)=>{
    const userId = req.userId
    try{
        const userAccount = await Account.find({userId:userId})
        if (!userAccount) return res.status(404).json({success:false,message: "Account not found"})
        res.json({success:true,balance:userAccount[0].balance})
    }catch(e){
        res.status(500).json({success:false,message:"Internal server error"})
    }
})
router.post("/send",authMiddleware,async(req,res)=>{
    const userId = req.userId;
    const {to,amount} = req.body;
    const session =await mongoose.startSession()
    session.startTransaction()
    try {
        const fromAccount = await Account.findOne({userId:userId})
        if (!fromAccount || fromAccount.balance < amount) {
            await session.abortTransaction()
            return res.status(401).json({success:false,message: "Transaction Failed"})}
        const toAccount = await Account.findOne({userId:req.body.to})
        if (!toAccount){
            await session.abortTransaction()
            return res.status(404).json({success:false,message: "Account not found"})
        }
        await Account.updateOne({userId:userId}, {$inc: {balance : -amount}}).session(session)
        await Account.updateOne({userId:req.body.to}, {$inc: {balance : +amount}}).session(session)

    } catch (error) {
        return res.status(404).json({success:false,message:"Failed to send money", ee: error.message})
    }
    await session.commitTransaction()
    res.json({success:true,message: "Transaction successful"})
})
export default router;