const { deleteFile } = require('../../middlewares/delete.file');
const Accommodation = require("../models/accommodation.model")




const getAccommodations = async(req, res) => {
    try {
        console.log("get all --------");
        const allAccommodations = await Accommodation.find();
        return res.status(200).json(allAccommodations);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getAccommodationsById = async(req, res) => {
    try {
        const {id} = req.params;
        const accommodation = await Accommodation.findById(id);
        if(!accommodation){
           return res.status(404).json({message: 'No tenemos accommodations con ese ID'}); 
        }
        return res.status(200).json(accommodation);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getAccommodationsBySearch = async(req, res) => {
    try {
        console.log("req.query--------", req.query);
        const city = req.query.city;
        const start = req.query.checkin;
        const end = req.query.checkout;
        const accommodation = await Accommodation.find({$or: [{city: city},{city: city.toLowerCase()}] });
        console.log(`accommodation in ${city}--------`, accommodation);
        if(!accommodation){
           return res.status(404).json({message: 'No tenemos accommodation en esa ciudad'}); 
        }
        return res.status(200).json(accommodation);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const postAccommodations = async(req, res) => {
    try {
        console.log("req-files -----------", req.files);
        console.log("req-body -----------", req.body);
        const newAccommodation = new Accommodation(req.body);
        if (req.file) {
            newAccommodation.images.push(req.file.path);
        }
        else if (req.files) {
            for (let file of req.files) {
                console.log("file---", file);
                newAccommodation.images.push(file.path);
            }
        }

        const createdAccommodation = await newAccommodation.save();   
        return res.status(201).json(createdAccommodation);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const putAccommodations = async(req, res) => {
    try {
        const {id} = req.params;
        const putAccommodation = new Accommodation(req.body);
        putAccommodation._id = id;
        if (req.file) {
            putAccommodation.images = req.file.path;
        }
        const updatedAccommodation = await Accommodation.findByIdAndUpdate(id, putAccommodation, {new: true});
        if(!updatedAccommodation){
            return res.status(404).json({message: 'No tenemos accommodations con ese ID'}); 
         }
         if(updatedAccommodation.images !== putAccommodation.images){
            deleteFile(updatedAccommodation.images);
        }
        return res.status(200).json(updatedAccommodation);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deleteAccommodations = async(req, res) => {
    try {
        const {id} = req.params;
        const deleteAccommodation = await Accommodation.findByIdAndDelete(id);
        if(!deleteAccommodation){
            return res.status(404).json({message: 'No tenemos accommodations con ese ID'}); 
         }
        return res.status(200).json(deleteAccommodation);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {getAccommodationsById, getAccommodations, getAccommodationsBySearch, postAccommodations, putAccommodations, deleteAccommodations}