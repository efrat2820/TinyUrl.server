import linkModel from "../Models/LinksModel.js"
import mongoose from "mongoose";

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
        // if(linkModel.findOne({'uniqueName':uniqueName}))
        //     throw Error("exists");
        const newLink = new linkModel({originalUrl,uniqueName});
        console.log("Link",newLink);
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

    redirectLink: async(name,ip,value)=>{
        console.log("contextName",name);
        const link = await linkModel.findOne({"uniqueName":name}); 
        link.clicks.push({insertedAt:Date.now() , ipAddress:ip, targetParamValue:value});
        link.save();
        console.log(link);
        const originalUrl=link.originalUrl;
        return originalUrl;
    },

    addTargetLink: async(name,targetValue,uniqueName)=>{
        const link = await linkModel.findOne({"uniqueName":uniqueName});
    
        link.targetValues.push({name:name , value:targetValue})
        link.save();
        return "http://localhost:5000/"+uniqueName+"?t="+targetValue;
    }
}

export default linkContext; 