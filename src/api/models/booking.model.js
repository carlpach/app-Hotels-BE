const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const bookingSchema = new Schema(
    {
        bookingCode: {type: String, required: true},
        name: {type: String, required: true},
        lastname: {type: String, required: true},
        dateEntry: {type: String, required: true},
        dateDeparture: {type: String, required: true},
        nights: {type: Number, required: true},
        price: {type: Number, required: true},
        people: {type: Number, required: true},
        image: {type: String, required: true},
        nameAlojamiento: {type: String, required: true},
        petitionCustomer: {type: String, required: false},
        room: {type: Schema.Types.ObjectId, ref: "booking", required: true},
    },{
        timestamps: true
    }
)


const booking = mongoose.model('Booking', bookingSchema);

module.exports = booking;