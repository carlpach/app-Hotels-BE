const { deleteFile } = require('../../middlewares/delete.file');
const Room = require("../models/room.model")


const getRoomsByID = async(req, res) => {
    try {
        const {id} = req.params;
        const room = await Room.findById(id);
        if(!room){
           return res.status(404).json({message: 'No tenemos rooms con ese ID'}); 
        }
        return res.status(200).json(room);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getRooms = async(req, res) => {
    try {
        const allRooms = await Room.find();
        return res.status(200).json(allRooms);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const postRooms = async(req, res) => {
    try {
        console.log(req.file);
        const newRoom = new Room(req.body);
        if (req.file) {
            newRoom.images = req.file.path;
        }
        const createdRoom = await newRoom.save();   
        return res.status(201).json(createdRoom);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const putRooms = async(req, res) => {
    try {
        const {id} = req.params;
        const putRoom = new Room(req.body);
        putRoom._id = id;
        if (req.file) {
            putRoom.images = req.file.path;
        }
        const updatedRoom = await Room.findByIdAndUpdate(id, putRoom, {new: true});
        if(!updatedRoom){
            return res.status(404).json({message: 'No tenemos rooms con ese ID'}); 
         }
         if(updatedRoom.images !== putRoom.images){
            deleteFile(updatedRoom.images);
        }
        return res.status(200).json(updatedRoom);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deleteRooms = async(req, res) => {
    try {
        const {id} = req.params;
        const deleteRoom = await Room.findByIdAndDelete(id);
        if(!deleteRoom){
            return res.status(404).json({message: 'No tenemos rooms con ese ID'}); 
         }
        return res.status(200).json(deleteRoom);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {getRoomsByID, getRooms, postRooms, putRooms, deleteRooms}