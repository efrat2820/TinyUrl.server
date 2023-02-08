import mongoose from 'mongoose'

const LinksModelSchama = mongoose.Schema({

    "originalUrl":String,
    "uniqueName":String,
    "clicks":[
        {
            "id":Number,
            "insertedAt":Date,
            "ipAddress": String
        }
    ]

})

export default mongoose.model('links', LinksModelSchama); 