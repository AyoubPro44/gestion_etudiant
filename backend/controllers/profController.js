const Prof = require('../models/profModel');
const jwt = require('jsonwebtoken');

class ProfController {
    async getCourses(req, res) {
        try {
            const { id_prof } = req.body
            console.log(id_prof)
            const [ courses ] = await Prof.getProfCourses(id_prof);
            return res.status(200).json({ courses: courses});
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new ProfController();
