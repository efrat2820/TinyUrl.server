import jwt from "jsonwebtoken"
//import userController from "./userController.js"
import userModel from "../Models/UserModel.js"
import context from "../Contexts/userContext.js"
const secret = "gbuhb4hvh5tc85"
const AuthController = {

    register: async(req,res)=>{//הרשמה
      const user = req.body;
      const token = jwt.sign(
      {userId:req.userId, userName: user.name ,  email: user.email}, secret) ;
      req.accessToken = token;
      res.send( {accessToken: token });
    },  

    login:async(req,res)=>{
      const {name} = req.body;
      const user = await userModel.findOne({name});
      console.log('user',user)
        if (user) {
        const token = jwt.sign(
          {userId:user._id, userName: user.name ,  email: user.email }, secret);
        res.send({ accessToken: token });
      } else {
        res.status(401).send({ message: "unauthorized" });
      }
    },

    auth:async(req,res,next)=>{//התחברות
      console.log('header',req.headers)
      const token = req.headers.authorization.slice(7);
      console.log("token", token);
      try {
        const decoded = jwt.verify(token, secret); 
        req.userId = decoded.userId;
        console.log("req.userId.auth",req.userId);
        next();
      } catch {
        res.status(401).send({ message: "unauthorized" });
      }
    }
}       
 

export default AuthController;