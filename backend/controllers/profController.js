const Prof = require('../models/profModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

class ProfController {
    async getCourses(req, res) {
        try {
            const { id_prof } = req.body
            const [courses] = await Prof.getProfCourses(id_prof);
            return res.status(200).json({ courses: courses });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    async updateProfInfos(req, res) {
        try {
            const { prof } = req.body;
            await User.updateInfos(prof.id_user, prof.firstname, prof.lastname, prof.email);
            await Prof.updateInfos(prof.id_prof, prof.num_bureau);
            await Prof.removeProfEnseignements(prof.id_prof);
            for (const id_sous_module of prof.sousModules) {
                await Prof.addEnseignement(prof.id_prof, id_sous_module);
            }
            return res.status(200).json({ message: "professeur information updated successfuly" })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getProfEnseignements(req, res) {
        try {
            const { id_prof } = req.body;
            const [enseignements] = await Prof.getProfEnseignements(id_prof);
            if(enseignements.length == 0) 
                return res.status(404).json({ message: "no enseignement found" });
            return res.status(200).json({ enseignements: enseignements })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ProfController();
