const express = require('express');
const upload = require("../../middlewares/upload.file")
const {getRoomsByID, getRooms, postRooms, putRooms, deleteRooms} = require('../controllers/room.controller');

const roomRoutes = express.Router();

roomRoutes.get('/', getRooms)

roomRoutes.get('/id/:id', getRoomsByID)

roomRoutes.post('/', upload.single("foto"), postRooms)

roomRoutes.put('/:id', upload.single("foto"), putRooms)

roomRoutes.delete('/:id', deleteRooms)

module.exports= roomRoutes;

