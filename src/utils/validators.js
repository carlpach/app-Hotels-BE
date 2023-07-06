const User = require("../api/models/user.model");

const validateEmail = (email) => {
    const regex = /^\S+@\S+\.\S+$/;

    return regex.test(String(email).toLowerCase());
}

const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

    return regex.test(String(password));
}

const usedEmail = async(email) => {
    const users = await User.find({ email: email });
    console.log(users.length)
    return users.length;
}

module.exports = { validatePassword, validateEmail, usedEmail }