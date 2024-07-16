const SousModule = require('../models/sousModuleModel');
const jwt = require('jsonwebtoken');

class SousModuleController {
    async getSousModuleFiliere(req, res) {
        try {
            const [sousModules] = await SousModule.getAllSousModuleFiliere()
            return res.status(200).json({ sousModules: sousModules});
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    async addSousModule(req, res) {
        try {
            const { id_module, nom_sous_module, coeff } = req.body
            await SousModule.insertSousModule(id_module, nom_sous_module, coeff)
            return res.status(200).json({ message: "Sous-Module inserted successfully" })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async deleteSousModule(req, res) {
        try {
            const { id_sous_module } = req.params
            await SousModule.deleteSousModule(id_sous_module)
            return res.status(200).json({ message: "Sous-Module deleted successfully" })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async updateSousModule(req, res) {
        try {
            const { id_sous_module, nom_sous_module, coeff } = req.body
            await SousModule.updateSousModule(id_sous_module, nom_sous_module, coeff)
            return res.status(200).json({ message: "Sous-Module updated successfully" })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

}

module.exports = new SousModuleController();
