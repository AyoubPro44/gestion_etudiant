const Filiere = require('../models/filiereModel');
const jwt = require('jsonwebtoken');

class FiliereController {
    async getFilieres(req, res) {
        try {
            const [filieres] = await Filiere.getAllFiliere();
            return res.status(200).json({ filieres: filieres});
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new FiliereController();
