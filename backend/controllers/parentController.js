const Parent = require('../models/parentModel');
const User = require('../models/userModel');
const Etudiant = require('../models/etudiantModel');

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

    async updateParentInfos(req, res) {
        try {
            const { parent } = req.body;
            await User.updateInfos(parent.id_user, parent.firstname, parent.lastname, parent.email);
            return res.status(200).json({ message: "parent informations updated successfuly" })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async removeParent(req, res) {
        try {
            const { id_etudiant } = req.body
            await Etudiant.removeParent(id_etudiant)
            return res.status(200).json({ message: 'Parent removed Successfully' })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async addParent(req, res) {
        try {
            const { num_etudiant, id_parent } = req.body
            await Etudiant.addParent(num_etudiant, id_parent)
            return res.status(200).json({ message: 'Parent added Successfully' }) 
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ParentController();
