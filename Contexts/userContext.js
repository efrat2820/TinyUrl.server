import userModel from "../Models/UserModel.js"
import LinksModel from "../Models/LinksModel.js";

const userContext ={

    getAllUser: async()=>{
        let users = await userModel.find();
        return users;
    } , 

    getUserById: async(id)=>{
        const user = await userModel.findById(id);
        console.log('user' , user);
        return user;
    },

    // getUserByNamePass: async(name)=>{
    //     const user = await userModel.findOne({name});
    //     console.log('user',user) 
    //     return user;
    // },

    addUser: (name,email,password,links)=>{
        const newUser = new userModel({name,email,password,links});
        newUser.save();
        
        return newUser; 
    },

    addLink: async(id)=>{
       // const updateUser = 
    },

    updateUser: async(id,user)=>{
        const updateUser = await userModel.findByIdAndUpdate(id,user,{new:true});
        updateUser.save();
        return updateUser;
    },

    removeUser: async(id)=>{
        const deleted = await userModel.findByIdAndRemove(id);
        return deleted;
    },

    deleteLink: async(id,user)=>{
       for (const [i, link] of (user.links).entries()){
           if (link.id == id)
           {
            (user.links).splice(i,1);
           }       
       }
       user.save();
    }
}

export default userContext;