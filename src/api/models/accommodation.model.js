const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const accommodationSchema = new Schema(
    {
        name: {type: String, required: true},
        city: {type: String, required: true},
        lowerPrice: {type: Number, required: true},
        type: {type: String, required: true, default: "Hotel", enum: ["Hotel", "Hostal", "Apartamento", "Camping"]},
        level: {type: Number, required: false, default: 0, enum: [0, 2, 3, 4, 5]},
        location: {
            lat: {type: Number, required: false},
            lng: {type: Number, required: false}
        },
        images: [{type: String, required: false}],
        rooms: [{type: Schema.Types.ObjectId, ref: "room"}],
    },{
        timestamps: true
    }
)


const accommodation = mongoose.model('Accommodation', accommodationSchema);

module.exports = accommodation;