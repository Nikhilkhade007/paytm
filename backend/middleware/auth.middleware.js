import jwt from "jsonwebtoken"
import { JWT_SECRET } from "../config.js";

export const authMiddleware = (req,res,next)=>{
    try {
        const token = req.headers.authorization;
        if (!token) return res.status(403).json({success:false,message:"Token is required"});
        const decoded = jwt.verify(token,JWT_SECRET)
        if (!decoded) return res.status(401).json({success:false,message: "Invalid token"})
        req.userId = decoded.rest._doc._id
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
    
    next()
}

