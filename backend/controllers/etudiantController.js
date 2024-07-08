const Etudiant = require('../models/etudiantModel');

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

}

module.exports = new EtudiantController();
