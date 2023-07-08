const { deleteFile } = require('../../middlewares/delete.file');
const Booking = require("../models/booking.model")


const getBookingsById = async(req, res) => {
    try {
        const {id} = req.params;
        const booking = await Booking.findById(id);
        if(!booking){
           return res.status(404).json({message: 'No tenemos bookings con ese ID'}); 
        }
        return res.status(200).json(booking);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getBookings = async(req, res) => {
    try {
        const allBookings = await Booking.find();
        return res.status(200).json(allBookings);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const postBookings = async(req, res) => {
    try {
        console.log("req-files -----------", req.files);
        console.log("req-body -----------", req.body);
        const newBooking = new Booking(req.body);
        if (req.file) {
            newBooking.images.push(req.file.path);
        }
        else if (req.files) {
            for (let file of req.files) {
                console.log("file---", file);
                newBooking.images.push(file.path);
            }
        }

        const createdBooking = await newBooking.save();   
        return res.status(201).json(createdBooking);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const putBookings = async(req, res) => {
    try {
        const {id} = req.params;
        const putBooking = new Booking(req.body);
        putBooking._id = id;
        if (req.file) {
            putBooking.images = req.file.path;
        }
        const updatedBooking = await Booking.findByIdAndUpdate(id, putBooking, {new: true});
        if(!updatedBooking){
            return res.status(404).json({message: 'No tenemos bookings con ese ID'}); 
         }
         if(updatedBooking.images !== putBooking.images){
            deleteFile(updatedBooking.images);
        }
        return res.status(200).json(updatedBooking);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deleteBookings = async(req, res) => {
    try {
        const {id} = req.params;
        const deleteBooking = await Booking.findByIdAndDelete(id);
        if(!deleteBooking){
            return res.status(404).json({message: 'No tenemos bookings con ese ID'}); 
         }
        return res.status(200).json(deleteBooking);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {getBookingsById, getBookings, postBookings, putBookings, deleteBookings}