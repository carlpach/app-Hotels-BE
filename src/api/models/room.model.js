const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const roomSchema = new Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
        features: [{type: String, required: true}],
        price: {type: Number, required: true},
        mainImage: {type: String, required: true},
        images: [{type: String, required: false}]
    },{
        timestamps: true
    }
)


const room = mongoose.model('Room', roomSchema);

module.exports = room;