const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        name: {type: String, required: false},
        lastname: {type: String, required: false},
        img: {type: String, required: false},
        email: {type: String, required: true},
        password: {type: String, required: true},
        role: {type: String, default: 'user', enum: ['admin', 'user', 'moderator']},
        rooms: [{type: Schema.Types.ObjectId, ref: "room"}],
        experiences: [{type: Schema.Types.ObjectId, ref: "experience"}]
    }
)

const User = mongoose.model('user', userSchema);

module.exports = User;