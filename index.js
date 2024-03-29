import express from "express"
import linksRouter from "./Routers/linkRouter.js"
import LinkController from "./Controllers/linkController.js"
import usersRouter from "./Routers/userRouter.js"
import authController from "./Controllers/authController.js"
import statisticsRouter from "./Routers/statisticsRouter.js"
import bodyParser from 'body-parser'
import connectDb  from './db.js'
import cors from "cors"

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(cors());
connectDb();

app.get("/",(req,res)=>{
   res.send("hello world")
})


app.use("/register",usersRouter,authController.register)
//app.use("/l",authController.register,usersRouter)
app.use('/login',authController.login)
app.use('/statistics',statisticsRouter)
//app.use("/",authController.auth)
app.use('/link',authController.auth,linksRouter)
app.use('/user',authController.auth,usersRouter)
app.use("/:uniqueName",LinkController.redirect)


app.listen(port,()=>{
    console.log(`Example app listening on port http://localhost:${port}`)
})