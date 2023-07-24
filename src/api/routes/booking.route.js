const express = require('express');
const upload = require("../../middlewares/upload.file")
const {getBookings, getBookingsById, postBookings, putBookings, deleteBookings} = require('../controllers/booking.controller');

const bookingRoutes = express.Router();

bookingRoutes.get('/', getBookings)

bookingRoutes.get('/id/:id', getBookingsById)

bookingRoutes.post('/', upload.array("images"), postBookings)

bookingRoutes.put('/:id', upload.array("images"), putBookings)

bookingRoutes.delete('/:id', deleteBookings)

module.exports= bookingRoutes;

