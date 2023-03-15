import context from "../Contexts/userContext.js"
import mail from "../mail/mail.js"
const UserController = {

    getList: async(req,res)=>{
        let users = await context.getAllUser();
        res.send(users);
    },

    getById: async(req,res)=>{
        const user = await context.getUserById(req.params.id);
        res.send(user);
    },

    getByNameAndPass: async(req,res)=>{
        const user = await context.getUserByNameAndPass(req.name,req.password);
        res.send(user);
    },

    add: async(req,res)=>{
        const {name,email,password} = req.body;
        // try{
        const newUser= await context.addUser(name,email,password);
        // }
        // catch{
        //     if(error.message == "exists name"){
        //         res.status(400).send({message:"exists name"});
        //     }
        // }
        mail.sendEmailRegister(name,email);
        res.send(newUser);
    },

    update: async(req,res)=>{
        const {id} = req.params;
        const {name,email,password} = req.body;

        const updateUser = await context.updateUser(id,{name,email,password});
        res.send(updateUser);
    },

    delete: async(req,res)=>{
        const deleted = await context.removeUser(req.params.id);
        res.send(deleted);
    },


}

export default UserController;