import linkModel from "../Models/LinksModel.js"
import reqId from "request-ip"

 
const clicksId = 124;

const linkContext ={

    getAllLink: async()=>{
        let links = await linkModel.find();
        return links;
    } , 

    getLinkById: async(id)=>{
        const link = await linkModel.findById(id);
        return link;
    },

    addLink: async( req /*,originalUrl,uniqueName*/)=>{
        const newLink = new linkModel(req.originalUrl,req.uniqueName);
        newLink.clicks.id = clicksId++;
        newLink.clicks.insertedAt = Date.now();
        newLink.clicks.ipAddress = reqId.getClientIp(req);
        newLink.save();
        return newLink;
    },

    updateLink: async(id,link)=>{
        const updateLink = await linkModel.findByIdAndUpdate(id,link,{new:true});
        const addLink = await updateLink.save();
        return addLink;
    },

    removeLink: async(id)=>{
        const deleted = await linkModel.findByIdAndRemove(id);
        return deleted;
    },

    redirectLink: async(name)=>{
        const link = await linkModel.findOne({uniqueName:'ultra'});//name
        const originalUrl=link.originalUrl;
        return originalUrl;
    }
}

export default linkContext;