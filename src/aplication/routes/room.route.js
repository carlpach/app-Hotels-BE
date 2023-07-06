const express = require('express');
const upload = require("../../middlewares/upload.file")
const {getRoomsById, getRooms, postRooms, putRooms, deleteRooms, getRoomsByID} = require('../controllers/room.controller');

const roomRoutes = express.Router();

roomRoutes.get('/', getRooms)

roomRoutes.get('/id/:id', getRoomsById)

roomRoutes.post('/', upload.single("foto"), postRooms)

roomRoutes.put('/:id', upload.single("foto"), putRooms)

roomRoutes.delete('/:id', deleteRooms)

module.exports= roomRoutes;