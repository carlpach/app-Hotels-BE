const express = require('express');
const upload = require("../../middlewares/upload.file")
const {getRoomsByID, getRooms, postRooms, putRooms, deleteRooms} = require('../controllers/room.controller');

const roomRoutes = express.Router();

roomRoutes.get('/', getRooms)

roomRoutes.get('/:id', getRoomsByID)

roomRoutes.post('/', upload.array("images"), postRooms)

roomRoutes.put('/:id', upload.array("images"), putRooms)

roomRoutes.delete('/:id', deleteRooms)

module.exports= roomRoutes;

