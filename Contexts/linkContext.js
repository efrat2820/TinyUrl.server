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

    addLink: async(originalUrl,uniqueName,name)=>{
        // if(linkModel.findOne({'uniqueName':uniqueName}))
        //     throw Error("exists");
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

    redirectLink: async(name,ip,value)=>{
        const link = await linkModel.findOne({"uniqueName":name});
        console.log('link', link);
        link.clicks.push({insertedAt:new Date() , ipAddress:ip, targetParamValue:value});
        link.save();
        console.log('link1',link);
        const originalUrl=link.originalUrl;
        return originalUrl;
    },

    addTargetLink: async(name,uniqueName)=>{
        const link = await linkModel.findOne({"uniqueName":uniqueName});
       // const ind = (link.targetValues[link.targetValues.length-1].value)+1;//////////////
        link.targetValues.push({name:name , value:1})/////////////
        link.save();
        return "https://tinyurl.com/efratc/"+uniqueName+"?t="+1;
    }
}

export default linkContext;