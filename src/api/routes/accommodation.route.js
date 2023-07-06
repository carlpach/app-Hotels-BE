const express = require('express');
const upload = require("../../middlewares/upload.file")
const {getAccommodations, getAccommodationsById, postAccommodations, putAccommodations, deleteExperinces} = require('../controllers/accommodation.controllers');

const accommodationRoutes = express.Router();

accommodationRoutes.get('/', getAccommodations)

accommodationRoutes.get('/id/:id', getAccommodationsById)

accommodationRoutes.post('/', upload.single("foto"), postAccommodations)

accommodationRoutes.put('/:id', upload.single("foto"), putAccommodations)

accommodationRoutes.delete('/:id', deleteExperinces)

module.exports= accommodationRoutes;

