const Etudiant = require('../models/etudiantModel');
const Module = require('../models/moduleModel');
const User = require('../models/userModel');

class EtudiantController {
  async checkNumEtudiant(req, res) {
    try {
      const { numEtudiant } = req.body
      const [etudiant] = await Etudiant.getEtudiantByNum(numEtudiant);
      if (etudiant.length === 0) {
        return res.status(200).json({ isFound: false });
      }
      return res.status(200).json({ isFound: true });
    } catch (e) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async hasParent(req, res) {
    try {
      const { numEtudiant } = req.body
      const [etudiant] = await Etudiant.getEtudiantByNum(numEtudiant);
      if (etudiant.length == 0)
        return res.status(200).json({ isHasParent: false });
      if (etudiant[0].ID_PARENT === null) {
        return res.status(200).json({ isHasParent: false });
      }
      return res.status(200).json({ isHasParent: true });
    } catch (e) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getAllEtudiantsByFiliere(req, res) {
    try {
      const { id_filiere, semestre } = req.params;
      const [etudiants] = await Etudiant.getEtudiantsByFiliere(id_filiere, semestre)
      if (etudiants.length == 0)
        return res.status(404).json({ error: 'No Etudiant Found' });
      return res.status(200).json({ etudiants: etudiants })
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async getAllEtudiantsWithNotes(req, res) {
    try {
      const { id_sous_module, id_filiere, semestre } = req.body;
      const [etudiants] = await Etudiant.getEtudiantsWithNotes(id_sous_module, id_filiere, semestre)
      if (etudiants.length == 0)
        return res.status(404).json({ error: 'No Etudiant Found' });
      return res.status(200).json({ etudiants: etudiants })
    } catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  async addEtudiantNote(req, res) {
    try {
      const { etudiants, id_sous_module } = req.body;
      if (etudiants.length == 0)
        return res.status(404).json({ message: 'No Etudiant Found' });

      for (const etudiant of etudiants) {
        if (etudiant.note_exam === null && etudiant.note_tp === null && etudiant.note_cc === null)
          continue;
        const [notes] = await Etudiant.checkNote(etudiant.id_etudiant, id_sous_module)
        if (notes.length == 0)
          await Etudiant.insertNote(etudiant.id_etudiant, id_sous_module, etudiant.note_exam, etudiant.note_tp, etudiant.note_cc);
        else
          await Etudiant.updateNote(etudiant.id_etudiant, id_sous_module, etudiant.note_exam, etudiant.note_tp, etudiant.note_cc);
      }
      return res.status(200).json({ message: 'Notes Added Successfuly' })
    }
    catch (error) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }


  async calculateTotalModule(sous_modules, id_module) {
    try {
      let coeffs = 0.0;
      let total = 0.0;
      let [nb_sous_modules] = await Module.getNbSousModule(id_module);

      if (!nb_sous_modules || !nb_sous_modules[0] || isNaN(nb_sous_modules[0].nb_sous_module)) {
        return null;
      }

      for (const sous_module of sous_modules) {
        if (!sous_module.total_sous_module || isNaN(parseFloat(sous_module.total_sous_module))) {
          return null;
        }
        const totalSousModule = parseFloat(sous_module.total_sous_module);
        if (isNaN(totalSousModule)) {
          return null;
        }
        total += totalSousModule;
        coeffs += sous_module.coeff;
      }


      return parseFloat((total / nb_sous_modules[0].nb_sous_module).toFixed(2));
    } catch (error) {
      console.error('Error in calculateTotalModule:', error);
      return null;
    }
  }



  calculateTotalSemestre(modules) {
    let total = 0;
    let nb_modules = 0;
    for (let i = 0; i < modules.length; i++) {
      if (modules[i].total_module === null || isNaN(parseFloat(modules[i].total_module))) {
        return null;
      }
      total += modules[i].total_module;
      nb_modules++;
    }
    return parseFloat((total / nb_modules).toFixed(2));;
  }

  calculateTotalYear(semestres) {
    let total = 0;
    let nb_semestres = 0;
    for (let i = 0; i < semestres.length; i++) {
      if (semestres[i].total_semestre === null || isNaN(parseFloat(semestres[i].total_semestre))) {
        return null;
      }
      total += semestres[i].total_semestre;
      nb_semestres++;
    }
    if (nb_semestres != 2)
      return null;
    return parseFloat((total / 2).toFixed(2));
  }


  yearNotes = async (req, res) => {
    const { id_etudiant, year } = req.body;
    try {
      const [notes] = await Etudiant.getEtudiantNotes(id_etudiant, year);

      let semestres = [];

      notes.forEach(note => {
        let semester = semestres.find(s => s.num == note.semestre);
        if (!semester) {
          semester = { num: note.semestre, modules: [] };
          semestres.push(semester);
        }

        let moduleObj = semester.modules.find(m => m.id_module == note.id_module);
        if (!moduleObj) {
          moduleObj = {
            id_module: note.id_module,
            name_module: note.nom_module,
            sous_modules: []
          };
          semester.modules.push(moduleObj);
        }

        if (note.id_sous_module) {
          moduleObj.sous_modules.push({
            id_sous_module: note.id_sous_module,
            nom_sous_module: note.nom_sous_module,
            note_exam: note.note_exam,
            note_tp: note.note_tp,
            note_cc: note.note_cc,
            total_sous_module: note.total_sous_module,
            coeff: note.COEFF
          });
        }
      });

      for (const semester of semestres) {
        for (const module of semester.modules) {
          module.total_module = await this.calculateTotalModule(module.sous_modules, module.id_module);
        }
      }

      semestres.forEach(s => {
        s.total_semestre = this.calculateTotalSemestre(s.modules);
      });

      const year_grades = {
        year: year,
        total_year: this.calculateTotalYear(semestres),
        semestres: semestres,
      };

      return res.status(200).json({ year_grades });
    } catch (error) {
      console.error('Error in yearNotes:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

  }

  async updateEtudiantInfos(req, res) {
    try {
      const { etudiant } = req.body;
      await User.updateInfos(etudiant.id_user, etudiant.firstname, etudiant.lastname, etudiant.email);
      const date = new Date(etudiant.dateNaissance);
      if (isNaN(date)) {
        throw new Error('Invalid date');
      }
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const formattedDate = year + '-' + month + '-' + day;
      await Etudiant.updateInfos(etudiant.id_etudiant, etudiant.adresse, formattedDate, etudiant.numEtudiant);

      return res.status(200).json({ message: "etudiant informations updated successfuly" })
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new EtudiantController();
