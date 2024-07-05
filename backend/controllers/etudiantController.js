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
      if(etudiant.length == 0)
        return res.status(200).json({ isHasParent: false });
      if (etudiant[0].ID_PARENT === null) {
        return res.status(200).json({ isHasParent: false });
      }
      return res.status(200).json({ isHasParent: true });
    } catch (e) {
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

}

module.exports = new EtudiantController();
