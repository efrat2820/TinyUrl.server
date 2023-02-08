import express from "express"
import redirect from "express-redirect"
import linksRouter from "./Routers/linkRouter.js"
import bodyParser from 'body-parser'
import connectDb  from './db.js'


const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.text());
//app.use('/links',linksRouter);

connectDb();
//redirect(app);

app.get("/",(req,res)=>{
   res.send("hello world")
})


app.use('/links',linksRouter);
app.use('/TinyUrl',linksRouter)
//app.redirect("/","https://ultracode.education/")


app.listen(port,()=>{
    console.log(`Example app listening on port http://localhost:${port}`)
})