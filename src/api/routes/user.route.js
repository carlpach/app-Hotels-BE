const express = require('express');
const {login, register, getUsers, putUser, putBookingInUser, checkSession} = require('../controllers/user.controller');
const upload = require("../../middlewares/upload.file")
const { isAuth } = require('../../middlewares/auth');

const userRoutes = express.Router();

userRoutes.post('/login', login)
userRoutes.post('/register', register);
userRoutes.get('/', getUsers);
userRoutes.put('/:id', upload.single("image"), putUser);
userRoutes.put('/addBooking/:id', putBookingInUser);
userRoutes.get('/checksession', isAuth, checkSession);

module.exports = userRoutes;