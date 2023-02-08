import mongoose from 'mongoose'

const uri=
 "mongodb+srv://efrat:72098765@todolistcluster.u0g8v8w.mongodb.net/?retryWrites=true&w=majority"
//"mongodb://localhost:27017/TinyUrl"

const connectDb = async () =>{
    await mongoose.connect(uri);
}

mongoose.connection.on("connected",()=>{
    console.log("mongo is connected")
});

mongoose.set('toJSON',{
    virtuals:true,
    transform: (doc,converted)=>{
        delete converted._id;
    }
});

export default connectDb;