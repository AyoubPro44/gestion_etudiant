import axios from 'axios';
import { SERVERPOINT } from '../const'

export const addModule = async (id_filiere, nom_module, semestre) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.post(SERVERPOINT + '/api/modules/addModule', { id_filiere, nom_module, semestre }, config);
        if (response.status === 200) {
            return response.data.message;
        }
    } catch (error) {
        throw error;
    }
}

export const updateModule = async (id_module, nom_module, semestre) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.post(SERVERPOINT + '/api/modules/updateModule', { id_module, nom_module, semestre }, config);
        if (response.status === 200) {
            return response.data.message;
        }
    } catch (error) {
        throw error;
    }
}

export const deleteModule = async (id_module) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.delete(SERVERPOINT + '/api/modules/deleteModule/' + id_module, config);
        if (response.status === 200) {
            return response.data.message;
        }
    } catch (error) {
        throw error;
    }
}

export const getModuleSousModules = async (id_module) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.get(SERVERPOINT + '/api/modules//sousModules/' + id_module, config);
        if (response.status === 200) {
            return response.data.sousModules;
        }
    } catch (error) {
        throw error;
    }
}