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