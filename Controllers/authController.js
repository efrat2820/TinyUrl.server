import jwt from "jsonwebtoken"
import userController from "./userController.js"


const secret = "gbuhb4hvh5tc85"
const AuthController = {

    login: async(req,res)=>{//הרשמה
        console.log("come")
    const {name,password} = req.body;
    const user = userController.getByNameAndPass({name,password});
    if (user) {
      const token = jwt.sign(
      { userId: user._id, userName: user.name, email:user.email }, secret) ;
      res.send( {accessToken: token });
    } else {
      res.status(401).send({ message: "unauthorized" });
    }     
    },

    register:async(req,res,next)=>{//התחברות

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