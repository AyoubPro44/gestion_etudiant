import axios from 'axios';
import { SERVERPOINT } from '../const'

export const getFiliereProgram = async (id_filiere) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.post(SERVERPOINT + '/api/filieres/filiereProgram', { id_filiere } , config);
        if(response.status === 200) {
            return response.data.program;
        }
    } catch (error) {
        throw error;
    }
}

export const getFiliereYears = async (id_filiere) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.get(SERVERPOINT + '/api/filieres/filiereYears/' + id_filiere, config);
        if(response.status === 200) {
            return response.data.years;
        }
    } catch (error) {
        throw error;
    }
}