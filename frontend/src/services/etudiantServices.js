import axios from 'axios';
import { SERVERPOINT } from '../const'

export const getEtudiantsByFiliere = async (id_filiere, semestre) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.get(SERVERPOINT + '/api/etudiants/etudiantsByFiliere/' + id_filiere + '/' + semestre, config);
        if (response.status === 200) {
            return response.data.etudiants;
        }
    } catch (error) {
        throw error;
    }
}

export const getEtudiantsWithNotes = async (id_sous_module, id_filiere, semestre) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.post(SERVERPOINT + '/api/etudiants/getEtudiantsWithNotes', { id_sous_module, id_filiere, semestre }, config);
        if (response.status === 200) {
            return response.data.etudiants;
        }
    } catch (error) {
        throw error;
    }
}

export const insertEtudiantsNotes = async (etudiants, id_sous_module) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.post(SERVERPOINT + '/api/etudiants/addEtudiantNote', { etudiants, id_sous_module }, config);
        return response.data.message;
    } catch (error) {
        throw error;
    }
}

export const getEtudiantYearNotes = async (id_etudiant, year) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.post(SERVERPOINT + '/api/etudiants/yearNotes', { id_etudiant, year }, config);
        if (response.status === 200) {
            return response.data.year_grades;
        }
    } catch (error) {
        throw error;
    }
}

export const updateEtudiantInfos = async (etudiant) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.post(SERVERPOINT + '/api/etudiants/updateEtudiantInfos', { etudiant }, config);
        if (response.status === 200) {
            localStorage.setItem('firstname', etudiant.firstname);
            localStorage.setItem('lastname', etudiant.lastname);
            localStorage.setItem('email', etudiant.email);
            localStorage.setItem('num_etudiant', etudiant.numEtudiant);
            localStorage.setItem('date_naissance', etudiant.dateNaissance);
            localStorage.setItem('adresse', etudiant.adresse);
            window.dispatchEvent(new Event('storage'));
            return response.data.message;
        }
    } catch (error) {
        throw error;
    }
}