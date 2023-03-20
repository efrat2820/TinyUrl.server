import jwt from "jsonwebtoken"
import userController from "./userController.js"


const secret = "gbuhb4hvh5tc85"
const AuthController = {

    register: async(req,res,next)=>{//הרשמה
      const user = req.body;
      const token = jwt.sign(
      { userName: user.name , password: user.password }, secret) ;
      res.send( {accessToken: token });
      next();
        
    },

    auth:async(req,res,next)=>{//התחברות

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