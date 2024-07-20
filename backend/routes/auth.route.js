import {Router} from "express"
import { SignInController, SignUpController, UpdateUser } from "../controllers/auth.controller.js"
import zodMiddleware from "../middleware/zod.middleware.js"
import { authMiddleware } from "../middleware/auth.middleware.js"
import { User } from "../schema/db.js"

const router = Router()

router.post('/signup',zodMiddleware,SignUpController)
router.get('/signin',SignInController)
router.put("/updateUser",zodMiddleware,authMiddleware,UpdateUser)
router.get('/bulk',async(req,res)=>{
    const filter = req.query.filter || ""
    const users = await User.find({
        $or:[{
            email: {
                "$regex": filter
            }
        },{
            username: {
                "$regex": filter
            }
        }]
    })
    res.json({
        user: users.map(e=>({
            username: e.username,
            email: e.email,
            _id: e._id
        }))
    })
})

export default router