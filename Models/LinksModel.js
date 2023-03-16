import mongoose from 'mongoose'
import { ObjectId } from 'bson';

const LinksModelSchama = mongoose.Schema({

    "originalUrl":String,
    "uniqueName":String,
    "clicks":[
        {
           // "id":ObjectId,
            "insertedAt":Date,
            "ipAddress": String,
            "targetParamValue":String
        }       
    ],
    "targetValues":[
        {
            //"id":ObjectId,
            "name":String,
            "value":String
        }
    ]

})

export default mongoose.model('links', LinksModelSchama); 