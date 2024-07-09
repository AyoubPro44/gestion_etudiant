import axios from 'axios';
import { SERVERPOINT } from '../const'

export const userLogin = async (email, password) => {
    try {
        const response = await axios.post(SERVERPOINT + '/api/users/login/', { email, password }, { withCredentials: true });
        if (response.status === 200) {
            localStorage.setItem('auth', true)
            localStorage.setItem('id_user', response.data.user.ID_USER);
            localStorage.setItem('firstname', response.data.user.FIRSTNAME);
            localStorage.setItem('lastname', response.data.user.LASTNAME);
            localStorage.setItem('email', response.data.user.EMAIL);
            localStorage.setItem('role', response.data.user.ROLE);
            localStorage.setItem('token', response.data.token);
            if (response.data.user.ROLE === "etudiant") {
                localStorage.setItem('id_etudiant', response.data.user.etudiant.ID_ETUDIANT);
                localStorage.setItem('id_filiere', response.data.user.etudiant.ID_FILIERE);
                localStorage.setItem('num_etudiant', response.data.user.etudiant.NUM_ETUDIANT);
                localStorage.setItem('date_naissance', response.data.user.etudiant.DATE_DE_NAISSANCE);
                localStorage.setItem('adresse', response.data.user.etudiant.ADRESSE);
                localStorage.setItem('semestre', response.data.user.etudiant.SEMESTRE);
                localStorage.setItem('id_parent', response.data.user.etudiant.ID_PARENT);
                localStorage.setItem('planning', response.data.user.etudiant.planning)
            }
            else if (response.data.user.ROLE === "professeur") {
                localStorage.setItem('id_prof', response.data.user.ID_PROF);
                localStorage.setItem('num_bureau', response.data.user.num_bureau)*
                localStorage.setItem('planning', response.data.user.planning)
            }
            else if (response.data.user.ROLE === "parent") {
                localStorage.setItem('id_parent', response.data.user.ID_PARENT)
            }
            else if (response.data.user.ROLE === "admin") {
                localStorage.setItem('id_admin', response.data.user.ID_ADMIN)
            }
        }
    } catch (error) {
        throw error;
    }
}

export const getTokenSignUp = async () => {
    try {
        const response = await axios.post(SERVERPOINT + '/api/token/getToken', { email: "admin@gmail.com", password: "password" }, { withCredentials: true });
        if (response.status === 200) {
            return response.data.token;
        }
    } catch (error) { }
}

export const checkEmail = async (email) => {
    try {
        const token = await getTokenSignUp();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.post(SERVERPOINT + '/api/users/checkEmail', { email }, config);
        if (response.status === 200)
            return response.data.isFound;
    } catch (error) {
        throw error;
    }
}

export const checkNumEtudiant = async (numEtudiant) => {
    try {
        const token = await getTokenSignUp();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.post(SERVERPOINT + '/api/etudiants/checkNumEtudiant', { numEtudiant }, config);
        if (response.status === 200)
            return response.data.isFound;
    } catch (error) {
        throw error;
    }
}

export const hasParent = async (numEtudiant) => {
    try {
        const token = await getTokenSignUp();
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.post(SERVERPOINT + '/api/etudiants/hasParent', { numEtudiant }, config);
        if (response.status === 200) {
            return response.data.isHasParent;
        }
    } catch (error) {
        throw error;
    }
}

export const createUser = async (user) => {
    try {
        const response = await axios.post(SERVERPOINT + '/api/users/createUser', { user }, { withCredentials: true });
    } catch (error) {

    }
}

export const logout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('id_user');
    localStorage.removeItem('firstname');
    localStorage.removeItem('lastname');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.removeItem('token');
    localStorage.removeItem('id_etudiant');
    localStorage.removeItem('id_filiere');
    localStorage.removeItem('num_etudiant');
    localStorage.removeItem('date_naissance');
    localStorage.removeItem('adresse');
    localStorage.removeItem('semestre');
    localStorage.removeItem('id_parent');
    localStorage.removeItem('id_prof');
    localStorage.removeItem('num_bureau');
    localStorage.removeItem('id_admin');
}