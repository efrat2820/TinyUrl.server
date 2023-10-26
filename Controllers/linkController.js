import context from "../Contexts/linkContext.js"
import reqId from "request-ip"
import userContext from "../Contexts/userContext.js"
// import jwt from "jsonwebtoken"
// const secret = "gbuhb4hvh5tc85"


const LinkController = {

    getList: async(req,res)=>{
        let links = await context.getAllLink();
        res.send(links);
    },

    getById: async(req,res)=>{
        const link = await context.getLinkById(req.params.id);
        res.send(link);
    },

    add: async(req,res)=>{
        const {originalUrl,uniqueName} = req.body;
        console.log('req.body', req.body)
        // try{
        const newLink =  await context.addLink(originalUrl,uniqueName);
        // }catch(error){
        //     if(error.message == "exists"){
        //         res.status(400).send({message:"exists"});
        //     }
        //}
        const tinyLink = "http://localhost:5000/"+uniqueName;
        console.log("userId",req.userId);
        const user =await userContext.getUserById(req.userId)
        user.links.push({"id":newLink._id});
        user.save();
        //mail.sendEmail(user.name,user.email,tinyLink)
        res.send(tinyLink);  
    },  

    update: async(req,res)=>{   
        const {id} = req.params;
        const {originalUrl} = req.body;

        const updateLink = await context.updateLink(id,{originalUrl});
        res.send(updateLink);
    },

    delete: async(req,res)=>{
        const userId = req.userId;
        const user = await userContext.getUserById(userId);
        console.log('user',user);
        await userContext.deleteLink(req.params.id,user);
        const deleted = await context.removeLink(req.params.id);
        res.send(deleted);
    },

    redirect: async(req,res)=>{
        const {uniqueName} = req.params;
        //const u = req.params;
        console.log("conrollerName",uniqueName);
        const t = req.query.t;/////////////////////////////////////////
        const idAddress = reqId.getClientIp(res);
        const originalUrl = await context.redirectLink(uniqueName,idAddress,t);
        console.log(originalUrl);
        res.redirect(originalUrl);
    },

    addTarget: async(req,res)=>{  
        const {name,targetValue} = req.body;
        const {uniqueName} = req.params;
        const newLink = await context.addTargetLink(name,targetValue,uniqueName);  
        res.send(newLink);
    }
}

export default LinkController;