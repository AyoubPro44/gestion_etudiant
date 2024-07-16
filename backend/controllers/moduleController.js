const Module = require('../models/moduleModel');

class ModuleController {
    async addNewModule(req, res) {
        try {
            const { id_filiere, nom_module, semestre } = req.body
            await Module.insertModule(id_filiere, nom_module, semestre)
            return res.status(200).json({ message: "Module inserted successfully" })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async deleteModule(req, res) {
        try {
            const { id_module } = req.params
            await Module.deleteModule(id_module)
            return res.status(200).json({ message: "Module deleted successfully" })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async updateModule(req, res) {
        try {
            const { id_module, nom_module, semestre } = req.body
            await Module.updateModule(id_module, nom_module, semestre)
            return res.status(200).json({ message: "Module updated successfully" })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }

    async getSousModulesByIdModule(req, res) {
        try {
            const { id_module } = req.params
            const [sousModules] = await Module.getSousModulesByIdModule(id_module)
            if(sousModules.length == 0)
                return res.status(404).json({ message: "no sous module found" })
            return res.status(200).json({ sousModules: sousModules })
        } catch (error) {
            return res.status(500).json({ error: error.message })
        }
    }
}

module.exports = new ModuleController();
