import jwt from "jsonwebtoken"
//import userController from "./userController.js"
import userModel from "../Models/UserModel.js"

const secret = "gbuhb4hvh5tc85"
const AuthController = {

    register: async(req,res,next)=>{//הרשמה
      const user = req.body;
      const token = jwt.sign(
      { userName: user.name ,  email: user.email}, secret) ;
      res.send( {accessToken: token });
      next();
        
    },

    login:async(req,res)=>{
      const {name} = req.body;
      const user = await userModel.findOne({name});
      console.log('user',user)
      // return user;
      // const user = userController.getByNameAndPass(name,password);
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
        next();
      } catch {
        res.status(401).send({ message: "unauthorized" });
      }
    }
}  


export default AuthController;