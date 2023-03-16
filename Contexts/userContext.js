import userModel from "../Models/UserModel.js"

const userContext ={

    getAllUser: async()=>{
        let users = await userModel.find();
        return users;
    } , 

    getUserById: async(id)=>{
        const user = await userModel.findById(id);
        return user;
    },

    addUser: async(name,email,password,links)=>{
        const newUser = new userModel({name,email,password,links});
        newUser.save();
        return newUser;
    },

    updateUser: async(id,user)=>{
        const updateUser = await userModel.findByIdAndUpdate(id,user,{new:true});
        updateUser.save();
        return updateUser;
    },

    removeUser: async(id)=>{
        const deleted = await userModel.findByIdAndRemove(id);
        return deleted;
    }
}

export default userContext;