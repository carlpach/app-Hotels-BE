const { generateSign } = require("../../utils/jwt");
const { validateEmail, validatePassword, usedEmail } = require("../../utils/validators");
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

const login = async(req, res) => {
    try {
        const userInfo = await User.findOne({email: req.body.email});
        if(!userInfo){
            return res.status(404).json({message: 'Email is not registered'});
        }
        if(!bcrypt.compareSync(req.body.password, userInfo.password)){
            return res.status(404).json({message: 'Password is incorrect'});
        }
        const token = generateSign(userInfo._id, userInfo.email);
        return res.status(200).json({user:userInfo, token:token});
    } catch (error) {
        return res.status(500).json(error); 
    }
};

const register = async(req, res) => {
    try {
        const newUser = new User(req.body);
        //validarEmail
        if(!validateEmail(newUser.email)){
            return res.status(400).json({message: "Invalid email"})
        }
        //validarPassword
        if(!validatePassword(newUser.password)){
            return res.status(400).json({message: "Invalid pasword"})
        }

        //validar email usado
        if(await usedEmail(newUser.email)){
            return res.status(400).json({message: "Email already used"})
        }
        
        //Encriptar Password
        newUser.password = bcrypt.hashSync(newUser.password, 10);
        console.log('Datos de registro:', newUser.email, newUser.password);
        const createdUser = await newUser.save();

        return res.status(201).json(createdUser)
    } catch (error) {
        return res.status(500).json(error); 
    }
};

const getUsers = async(req, res) => {
    try {
        const allUsers = await User.find();
        return res.status(200).json(allUsers);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const putUser = async(req, res) => {
    try {
        const {id} = req.params;
        const putUser = new User(req.body);
        putUser._id = id;
        console.log(`putuser -------- ${putUser}`);
        if (req.file) {
            putUser.image = req.file.path;
        }
        const updatedUser = await User.findByIdAndUpdate(id, putUser, {new: true});
        console.log(`updatedUser 1 -------- ${updatedUser}`);
        if(!updatedUser){
            return res.status(404).json({message: 'No tenemos users con ese ID'}); 
         }
         if(updatedUser.image !== putUser.image){
            deleteFile(updatedUser.image);
        }

        console.log(`updatedUser 2 -------- ${updatedUser}`);
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json(error);
    }
}

//Método PUT para para anadir una booking a un User
const putBookingInUser = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.body._id;
        console.log("userid---", userId);
        console.log(req.params);
        const duplicateUser = await User.find({$and: [{_id: userId},{bookings: {$in: [id]}}]});
        if(duplicateUser.length > 0) {
            return res.status(405).json({ message: "Booking already exists in user." });
        }
        console.log(User);
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $push: { bookings: id } },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }
        console.log("updated user -------", updatedUser);
        return res.status(200).json(updatedUser);
    } catch (error) {
        return res.status(500).json(error);
    }
};

const checkSession = (req, res) => {
    try {
        return res.status(201).json(req.user)
    } catch (error) {
        return res.status(500).json(error); 
    }
}

module.exports = {login, register, getUsers, putUser, putBookingInUser, checkSession}