const express = require('express');
const upload = require("../../middlewares/upload.file")
const {getAccommodations, getAccommodationsById, postAccommodations, putAccommodations, deleteAccommodations} = require('../controllers/accommodation.controller');

const accommodationRoutes = express.Router();

accommodationRoutes.get('/', getAccommodations)

accommodationRoutes.get('/id/:id', getAccommodationsById)

accommodationRoutes.post('/', upload.single("foto"), postAccommodations)

accommodationRoutes.put('/:id', upload.single("foto"), putAccommodations)

accommodationRoutes.delete('/:id', deleteAccommodations)

module.exports= accommodationRoutes;

