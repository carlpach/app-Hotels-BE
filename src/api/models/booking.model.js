const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const bookingSchema = new Schema(
    {
        bookingCode: {type: String, required: true},
        name: {type: String, required: true},
        surname: {type: String, required: true},
        dateEntry: {type: String, required: true},
        dateDeparture: {type: String, required: true},
        nights: {type: Number, required: false},
        timeCheckin: {type: String, required: false},
        petitionCustomer: {type: String, required: false},
        room: {type: Schema.Types.ObjectId, ref: "booking", required: true},
    },{
        timestamps: true
    }
)


const booking = mongoose.model('Booking', bookingSchema);

module.exports = booking;