const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const accomodationSchema = new Schema(
    {
        name: {type: String, required: true},
        city: {type: String, required: true},
        type: {type: String, required: true, default: "Hotel", enum: ["Hotel", "Hostal", "Apartamento", "Camping"]},
        category: {type: String, required: true, default: "Visita guiada", enum: ["Hotel", "Habitación", "Propiedad"]},
        level: {type: Number, required: false, default: None, enum: [2,3,4,5, None]},
        location: {lat: {type: Number, required: false},lng: {type: Number, required: false}},
        images: {type: [String], required: false},
        rooms: [{type: Schema.Types.ObjectId, ref: "room"}],
    },{
        timestamps: true
    }
)


const accomodation = mongoose.model('Accomodation', accomodationSchema);

module.exports = accomodation;