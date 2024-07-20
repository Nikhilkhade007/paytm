import e from "express"
import mongoose from "mongoose"
import SignUpAndSignIn from "./routes/auth.route.js"
import userAccount from "./routes/account.route.js"
import cors from "cors"
import * as env from "dotenv"
const app = e()
env.config()
mongoose.connect(process.env.DB_URL).then((res)=>{
    console.log("connected to DB");
})

app.use(cors())
app.use(e.json())
app.use("/api/users",SignUpAndSignIn)
app.use("/api/accounts",userAccount)

app.listen('4000',()=>{
    console.log("listening on http://localhost/3000");
})