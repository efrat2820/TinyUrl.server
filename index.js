import express from "express"
import linksRouter from "./Routers/linkRouter.js"
import usersRouter from "./Routers/userRouter.js"
import bodyParser from 'body-parser'
import connectDb  from './db.js'


const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.text());

connectDb();

app.get("/",(req,res)=>{
   res.send("hello world")
})



app.use('/TinyUrl',linksRouter)
app.use('/user',usersRouter)


app.listen(port,()=>{
    console.log(`Example app listening on port http://localhost:${port}`)
})