import context from "../Contexts/linkContext.js"
import reqId from "request-ip"


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
        const {originalUrl,uniqueName,name} = req.body;
        console.log('req.body', req.body)
        // try{
            await context.addLink(originalUrl,uniqueName,name);
        // }catch(error){
        //     if(error.message == "exists"){
        //         res.status(400).send({message:"exists"});
        //     }
        //}
        const tinyLink = "https://tinyurl-m5pd.onrender.com/TinyUrl/"+uniqueName;
        // const tinyLink = "http://localhost:5000/TinyUrl/"+uniqueName;
        res.send(tinyLink);
    },

    update: async(req,res)=>{
        const {id} = req.params;
        const {originalUrl} = req.body;

        const updateLink = await context.updateLink(id,{originalUrl});
        res.send(updateLink);
    },

    delete: async(req,res)=>{
        const deleted = await context.removeLink(req.params.id);
        res.send(deleted);
    },

    redirect: async(req,res)=>{
        const {uniqueName} = req.params;
        const t = req.query.t;
        const idAddress = reqId.getClientIp(res);
        const originalUrl = await context.redirectLink(uniqueName,idAddress,t);
        console.log(originalUrl);
        res.redirect(originalUrl);
        
    },

    addTarget: async(req,res)=>{
        const {name} = req.body;
        const {uniqueName} = req.params;
        const newLink = await context.addTargetLink(name,uniqueName);
        res.send(newLink);
    }
}

export default LinkController;