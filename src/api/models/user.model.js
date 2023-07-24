const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {type: String, required: false},
        lastname: {type: String, required: false},
        image: {type: String, required: false},
        email: {type: String, required: true},
        password: {type: String, required: true},
        role: {type: String, default: 'user', enum: ['admin', 'user', 'moderator']},
        bookings: [{type: Schema.Types.ObjectId, ref: "booking"}],
    }
)

const User = mongoose.model('user', userSchema);

module.exports = User;