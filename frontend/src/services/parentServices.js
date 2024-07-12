import axios from 'axios';
import { SERVERPOINT } from '../const'

export const getParentEtudiants = async (id_parent) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.post(SERVERPOINT + '/api/parents/parentEtudiants', { id_parent }, config);
        if (response.status === 200) {
            return response.data.etudiants;
        }
    } catch (error) {
        throw error;
    }
}

export const updateParentInfos = async (parent) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.post(SERVERPOINT + '/api/parents/updateParentInfos', { parent }, config);
        if (response.status === 200) {
            localStorage.setItem('firstname', parent.firstname);
            localStorage.setItem('lastname', parent.lastname);
            localStorage.setItem('email', parent.email);
            window.dispatchEvent(new Event('storage'));
            return response.data.message;
        }
    } catch (error) {
        throw error;
    }
}

export const removeParent = async (id_etudiant) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.post(SERVERPOINT + '/api/parents/removeParent', { id_etudiant }, config);
        if (response.status === 200) {
            return response.data.message;
        }
    } catch (error) {
        throw error;
    }
}

export const addParent = async (num_etudiant, id_parent) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.post(SERVERPOINT + '/api/parents/addParent', { num_etudiant, id_parent }, config);
        if (response.status === 200) {
            return response.data.message;
        }
    } catch (error) {
        throw error;
    }
}