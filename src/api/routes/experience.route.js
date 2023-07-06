const express = require('express');
const upload = require("../../middlewares/upload.file")
const {getExperiencesById, getExperiences, postExperiences, putExperiences, deleteExperiences} = require('../controllers/experience.controller');

const experienceRoutes = express.Router();

experienceRoutes.get('/', getExperiences)

experienceRoutes.get('/id/:id', getExperiencesById)

experienceRoutes.post('/', upload.single("foto"), postExperiences)

experienceRoutes.put('/:id', upload.single("foto"), putExperiences)

experienceRoutes.delete('/:id', deleteExperiences)

module.exports= experienceRoutes;

