import axios from 'axios';
import { SERVERPOINT } from '../const'

export const addSousModule = async (id_module, nom_sous_module, coeff) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.post(SERVERPOINT + '/api/sousModule/addSousModule', { id_module, nom_sous_module, coeff }, config);
        if (response.status === 200) {
            return response.data.message;
        }
    } catch (error) {
        throw error;
    }
}

export const updateSousModule = async (id_sous_module, nom_sous_module, coeff) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.post(SERVERPOINT + '/api/sousModule/updateSousModule', { id_sous_module, nom_sous_module, coeff }, config);
        if (response.status === 200) {
            return response.data.message;
        }
    } catch (error) {
        throw error;
    }
}

export const deleteSousModule = async (id_sous_module) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.delete(SERVERPOINT + '/api/sousModule/deletesousModule/' + id_sous_module, config);
        if (response.status === 200) {
            return response.data.message;
        }
    } catch (error) {
        throw error;
    }
}