const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const roomSchema = new Schema(
    {
        name: {type: String, required: true},
        description: {type: String, required: true},
        features: {type: String, required: true, default: "Single", enum: ["Single", "Doble", "Terrace", "Gimnasio", "Cocina", "Mascotas", "Cafetera", "Tetera"]},
        price: {type: Number, required: true},
    },{
        timestamps: true
    }
)


const room = mongoose.model('Room', roomSchema);

module.exports = room;