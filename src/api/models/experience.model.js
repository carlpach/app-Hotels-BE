const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const experienceSchema = new Schema(
    {
        name: {type: String, required: true},
        city: {type: String, required: true},
        description: {type: String, required: true},
        type: {type: String, required: true, default: "Visita guiada", enum: ["Visita guiada", "Parque de atracciones", "Museo", "Experiencia gastronómica"]},
        location: {lat: {type: Number, required: false},lng: {type: Number, required: false}},
        images: [{type: String, required: false}]
    },{
        timestamps: true
    }
)


const experience = mongoose.model('Experience', experienceSchema);

module.exports = experience;