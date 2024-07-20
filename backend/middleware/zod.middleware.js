import { z } from "zod"

const UserShemaCheck = z.object({
    username: z.string(),
    email:z.string().email(),
    password: z.string().min(8)
})

export default function zodMiddleware(req, res, next){
    const isValid = UserShemaCheck.safeParse(req.body)
    if (!isValid.success){
        return res.status(401).json({success:false,message: "Invalid username or password"})
    }else{
        next()
    }
    
}