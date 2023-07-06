const { deleteFile } = require('../../middlewares/delete.file');
const Experience = require("../models/experience.model")


const getExperiencesByID = async(req, res) => {
    try {
        const {id} = req.params;
        const experience = await Experience.findById(id);
        if(!experience){
           return res.status(404).json({message: 'No tenemos experiences con ese ID'}); 
        }
        return res.status(200).json(experience);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const getExperiences = async(req, res) => {
    try {
        const allExperiences = await Experience.find();
        return res.status(200).json(allExperiences);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const postExperiences = async(req, res) => {
    try {
        console.log(req.file);
        const newExperience = new Experience(req.body);
        if (req.file) {
            newExperience.foto = req.file.path;
        }
        const createdExperience = await newExperience.save();   
        return res.status(201).json(createdExperience);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const putExperiences = async(req, res) => {
    try {
        const {id} = req.params;
        const putExperience = new Experience(req.body);
        putExperience._id = id;
        if (req.file) {
            putExperience.foto = req.file.path;
        }
        const updatedExperience = await Experience.findByIdAndUpdate(id, putExperience, {new: true});
        if(!updatedExperience){
            return res.status(404).json({message: 'No tenemos experiences con ese ID'}); 
         }
         if(updatedExperience.foto !== putExperience.foto){
            deleteFile(updatedExperience.foto);
        }
        return res.status(200).json(updatedExperience);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const deleteExperiences = async(req, res) => {
    try {
        const {id} = req.params;
        const deleteExperience = await Experience.findByIdAndDelete(id);
        if(!deleteExperience){
            return res.status(404).json({message: 'No tenemos experiences con ese ID'}); 
         }
        return res.status(200).json(deleteExperience);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {getExperiencesByID, getExperiences, postExperiences, putExperiences, deleteExperiences}