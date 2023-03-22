import mongoose from 'mongoose'


const UsersModelSchema = mongoose.Schema({
   
    "name":String,
    "email":String,
    "password":String,
    "links":[
        {
            "id":String
        }
    ]
    
})

export default mongoose.model('users',UsersModelSchema ); 