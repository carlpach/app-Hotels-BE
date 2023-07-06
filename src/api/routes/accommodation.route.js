const express = require('express');
const upload = require("../../middlewares/upload.file")
const {getAccommodations, getAccommodationsById, postAccommodations, putAccommodations, deleteAccommodations} = require('../controllers/accommodation.controller');

const accommodationRoutes = express.Router();

accommodationRoutes.get('/', getAccommodations)

accommodationRoutes.get('/id/:id', getAccommodationsById)

accommodationRoutes.post('/', upload.array("images"), postAccommodations)

accommodationRoutes.put('/:id', upload.array("images"), putAccommodations)

accommodationRoutes.delete('/:id', deleteAccommodations)

module.exports= accommodationRoutes;

