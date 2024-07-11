const Parent = require('../models/parentModel');
const jwt = require('jsonwebtoken');

class ParentController {
    async getAllParentEtudiants(req, res) {
        try {
            const { id_parent } = req.body
            const [etudiants] = await Parent.getParentEtudiants(id_parent);
            if (etudiants.length == 0)
                return res.status(404).json({ message: 'No Etudiant Found' });
            return res.status(200).json({ etudiants: etudiants });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
}

module.exports = new ParentController();
