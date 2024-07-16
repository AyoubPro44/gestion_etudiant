const Filiere = require('../models/filiereModel');
const Module = require('../models/moduleModel');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../uploads/plannings'));
        },
        filename: (req, file, cb) => {
            cb(null, 'planning_' + Date.now() + path.extname(file.originalname));
        }
    }),
    fileFilter: (req, file, cb) => {
        cb(null, true);
    }
});



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

    async getFiliereNbModule(req, res) {
        const { id_filiere } = req.params;

        try {
            const [years] = await Filiere.getYearModuleNumber(id_filiere);
            if (years.length == 0)
                return res.status(404).json({ error: 'no year not found' });
            return res.status(200).json({ years: years })
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getFilieresInfos(req, res) {
        try {
            const [filieres] = await Filiere.getAllFiliereInfos();
            if (filieres.length == 0)
                return res.status(404).json({ error: 'no filiere not found' });
            return res.status(200).json({ filieres: filieres })
        } catch (error) {
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    async getFiliereById(req, res) {
        try {
            const { id_filiere } = req.params
            const [filieres] = await Filiere.getFiliereById(id_filiere);
            if (filieres.length == 0)
                return res.status(404).json({ error: 'no filiere not found' });
            return res.status(200).json({ filiere: filieres[0] })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async updateFiliereName(req, res) {
        try {
            const { id_filiere, nom_filiere } = req.body;
            await Filiere.updateFiliereName(nom_filiere, id_filiere);
            return res.status(200).json({ message: 'Filiere updated successfully' })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getFiliereSemestres(req, res) {
        try {
            const { id_filiere } = req.params;
            const [semestres] = await Filiere.getFiliereSemestres(id_filiere);
            if (semestres.length == 0)
                return res.status(404).json({ error: 'no semestre not found' });
            return res.status(200).json({ semestres: semestres })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async updatePlanning(req, res) {
        const { planning, image, id_filiere, semestre } = req.body;
        
        try {
            let updatedImage = '';
            if (image) {
                const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
                const buffer = Buffer.from(base64Data, 'base64');
                const imageName = 'planning_' + Date.now() + '.jpg';
                fs.writeFileSync(path.join(__dirname, '../uploads/plannings', imageName), buffer);
                updatedImage = imageName;
                if (planning) {
                    const imagePath = path.join(__dirname, '../uploads/plannings', planning);
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    }
                }
            }
            console.log(updatedImage)

            await Filiere.updatePlanning(updatedImage, id_filiere, semestre)
            return res.status(200).json({ message: "planning updated successfully" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getModulesFiliere(req, res) {
        try {
            const { id_filiere } = req.params
            const [modules] = await Module.getModulesFiliere(id_filiere);
            if(modules.length == 0)
                return res.status(404).json({ message: "no module found" });
            return res.status(200).json({ modules: modules });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    uploadMiddleware() {
        return upload.single('image');
    }
}

module.exports = new FiliereController();
