const Prof = require('../models/profModel');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
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

    async insertReport(req, res) {
        try {
            const { id_prof, report_content } = req.body
            await Prof.saveReport(id_prof, report_content)
            return res.status(200).json({ message: 'report saved successfully' })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async getAllProfs(req, res) {
        try {
            const [profs] = await Prof.getAllProfs();
            if(profs.length == 0)
                return res.status(404).json({ message: "no prof found" })
            return res.status(200).json({ profs: profs })
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    async updateProfPlanning(req, res) {
        const { planning, image, id_prof } = req.body;
        
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

            await Prof.updateProfPlanning(updatedImage, id_prof);
            return res.status(200).json({ message: "planning updated successfully" });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    }

    uploadMiddleware() {
        return upload.single('image');
    }
}

module.exports = new ProfController();
