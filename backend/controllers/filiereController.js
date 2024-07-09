const Filiere = require('../models/filiereModel');
const jwt = require('jsonwebtoken');

class FiliereController {
    async getFilieres(req, res) {
        try {
            const [filieres] = await Filiere.getAllFiliere();
            return res.status(200).json({ filieres: filieres });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }


    async getFiliereProgram(req, res) {
        const { id_filiere } = req.body;

        try {
            const [filieres] = await Filiere.getFiliereById(id_filiere);
            if (filieres.length === 0) {
                return res.status(404).json({ error: 'Filiere not found' });
            }

            const modules = await Filiere.getFiliereProgram(id_filiere);

            let semestres = [];

            modules[0].forEach(module => {
                let semester = semestres.find(s => s.name === `Semester ${module.SEMESTRE}`);
                if (!semester) {
                    semester = { name: `Semester ${module.SEMESTRE}`, modules: [] };
                    semestres.push(semester);
                }

                let moduleObj = semester.modules.find(m => m.name === module.NOM_MODULE);
                if (!moduleObj) {
                    moduleObj = { name: module.NOM_MODULE, sousModules: [] };
                    semester.modules.push(moduleObj);
                }

                if (module.NOM_SOUS_MODULE) {
                    moduleObj.sousModules.push({
                        name: module.NOM_SOUS_MODULE,
                        coeff: module.COEFF
                    });
                }
            });

            const filiereProgram = {
                filiere: filieres[0].NOM_FILIERE,
                semestres: semestres
            };

            return res.status(200).json({ program: filiereProgram });
        } catch (error) {
            return res.status(500).json({ error: 'Failed to fetch program information' });
        }
    };
}

module.exports = new FiliereController();
