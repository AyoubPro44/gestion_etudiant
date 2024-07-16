import axios from 'axios';
import { SERVERPOINT } from '../const'

export const getProfCourses = async (id_prof) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.post(SERVERPOINT + '/api/professeur/getProfCourses', { id_prof }, config);
        if (response.status === 200) {
            return response.data.courses;
        }
    } catch (error) {
        throw error;
    }
}

export const updateProfInfos = async (prof) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.post(SERVERPOINT + '/api/professeur/updateProfInfos', { prof }, config);
        if (response.status === 200) {
            localStorage.setItem('firstname', prof.firstname);
            localStorage.setItem('lastname', prof.lastname);
            localStorage.setItem('email', prof.email);
            localStorage.setItem('num_bureau', prof.num_bureau);
            window.dispatchEvent(new Event('storage')); 

            return response.data.message;
        }
    } catch (error) {
        throw error;
    }
}


export const getProfEnseignements = async (id_prof) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.post(SERVERPOINT + '/api/professeur/profEnseignements', { id_prof }, config);
        if (response.status === 200) {
            return response.data.enseignements;
        }
    } catch (error) {
        throw error;
    }
}

export const saveReport = async (id_prof, report_content) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.post(SERVERPOINT + '/api/professeur/saveReport', { id_prof, report_content }, config);
        return response.status
    } catch (error) {
        throw error;
    }
}

export const getAllProfs = async () => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.get(SERVERPOINT + '/api/professeur/getAllProfs', config);
        if (response.status === 200) {
            return response.data.profs;
        }
    } catch (error) {
        throw error;
    }
}

export const updateProfPlanning = async (planning, image, id_prof) => {
    try {
        const formData = new FormData();
        formData.append('id_prof', id_prof);
        formData.append('planning', planning);
        formData.append('image', image);

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        };

        const response = await axios.post(`${SERVERPOINT}/api/professeur/updateProfPlanning`, formData, config);
        if (response.status === 200) {
            return response.data.message; 
        } else {
            throw new Error('Failed to update planning');
        }
    } catch (error) {
        throw error;
    }
};