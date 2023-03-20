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

    add: async(req,res)=>{
        const {name,email,password} = req.body;
        console.log('req.body', req.body)
        const newUser= await context.addUser(name,email,password);
        mail.sendEmailRegister(name,email)
        //res.send(newUser);
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