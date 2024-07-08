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
        if(response.status === 200) {
            return response.data.etudiants;
        }
    } catch (error) {
        throw error;
    }
}

export const getEtudiantsWithNotes = async (id_sous_module ,id_filiere, semestre) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.post(SERVERPOINT + '/api/etudiants/getEtudiantsWithNotes', {id_sous_module, id_filiere, semestre}, config);
        if(response.status === 200) {
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
        const response = await axios.post(SERVERPOINT + '/api/etudiants/addEtudiantNote', {etudiants, id_sous_module}, config);
        return response.data.message;
    } catch (error) {
        throw error;
    }
}