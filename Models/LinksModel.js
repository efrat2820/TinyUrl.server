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
            "targetParamValue":Number
        }       
    ],
    "targetValues":[
        {
            //"id":ObjectId,
            "name":String,
            "value":Number
        }
    ]

})

export default mongoose.model('links', LinksModelSchama); 