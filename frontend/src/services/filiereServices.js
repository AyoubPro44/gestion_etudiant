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
        const response = await axios.post(SERVERPOINT + '/api/filieres/filiereProgram', { id_filiere }, config);
        if (response.status === 200) {
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
        if (response.status === 200) {
            return response.data.years;
        }
    } catch (error) {
        throw error;
    }
}

export const getFilieresDetails = async () => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.get(SERVERPOINT + '/api/filieres/filieresInfos', config);
        if (response.status === 200) {
            return response.data.filieres;
        }
    } catch (error) {
        throw error;
    }
}

export const getFiliereById = async (id_filiere) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.get(SERVERPOINT + '/api/filieres/filiereById/' + id_filiere, config);
        if (response.status === 200) {
            return response.data.filiere;
        }
    } catch (error) {
        throw error;
    }
}

export const updateFiliereName = async (nom_filiere, id_filiere) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.post(SERVERPOINT + '/api/filieres/updateFiliereName/', { nom_filiere, id_filiere }, config);
        if (response.status === 200) {
            return response.data.message;
        }
    } catch (error) {
        throw error;
    }
}

export const getFiliereSemestres = async (id_filiere) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.get(SERVERPOINT + '/api/filieres/filiereSemestres/' + id_filiere, config);
        if (response.status === 200) {
            return response.data.semestres;
        }
    } catch (error) {
        throw error;
    }
}

export const updatePlanning = async (id_filiere, semestre, planning, image) => {
    try {
        const formData = new FormData();
        formData.append('id_filiere', id_filiere);
        formData.append('semestre', semestre);
        formData.append('planning', planning);
        formData.append('image', image);

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        };

        const response = await axios.post(`${SERVERPOINT}/api/filieres/updatePlanning`, formData, config);
        if (response.status === 200) {
            return response.data.message; 
        } else {
            throw new Error('Failed to update planning');
        }
    } catch (error) {
        throw error;
    }
};

export const getModulesFiliere = async (id_filiere) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.get(SERVERPOINT + '/api/filieres/modulesFiliere/' + id_filiere, config);
        if (response.status === 200) {
            return response.data.modules;
        }
    } catch (error) {
        throw error;
    }
}

export const deleteFiliere = async (id_filiere) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.delete(SERVERPOINT + '/api/filieres/deleteFiliere/' + id_filiere, config);
        if (response.status === 200) {
            return response.data.message;
        }
    } catch (error) {
        throw error;
    }
}

export const addFiliere = async (nom_filiere) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.post(SERVERPOINT + '/api/filieres/addFiliere', { nom_filiere }, config);
        if (response.status === 200) {
            return response.data.message;
        }
    } catch (error) {
        throw error;
    }
}

export const getSemestresNbEtudiants = async (id_filiere) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.get(SERVERPOINT + '/api/filieres/semestresNbEtudiants/' + id_filiere, config);
        if (response.status === 200) {
            return response.data.semestres;
        }
    } catch (error) {
        throw error;
    }
}