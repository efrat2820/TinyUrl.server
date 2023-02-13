import linkModel from "../Models/LinksModel.js"
//import reqId from "request-ip"

 
let clicksId = 124;

const linkContext ={

    getAllLink: async()=>{
        let links = await linkModel.find();
        return links;
    } , 

    getLinkById: async(id)=>{
        const link = await linkModel.findById(id);
        return link;
    },

    addLink: async(originalUrl,uniqueName)=>{
        if(linkModel.findOne({'uniqueName':uniqueName}))
            throw Error("exists");
        const newLink = new linkModel({originalUrl,uniqueName});
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

    redirectLink: async(name,ip)=>{
        const link = await linkModel.findOne({"uniqueName":name});
        link.clicks.push({ id:clicksId++ , insertedAt:Date.now() , ipAddress:ip})
        // link.clicks.id = clicksId++;
        // link.clicks.insertedAt = Date.now();
        //link.clicks.ipAddress = reqId.getClientIp(req);
        const originalUrl=link.originalUrl;
        return originalUrl;
    }
}

export default linkContext;