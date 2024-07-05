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
}

module.exports = new SousModuleController();
