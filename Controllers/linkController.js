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
        const {originalUrl,uniqueName} = req.body;
        console.log('req.body', req.body)
        // try{
            await context.addLink(originalUrl,uniqueName);
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
        const idAddress = reqId.getClientIp(res);
        const originalUrl = await context.redirectLink(uniqueName,idAddress);
        console.log(originalUrl);
        res.redirect(originalUrl);
        
    }

}

export default LinkController;