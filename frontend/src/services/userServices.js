import axios from 'axios';
import { SERVERPOINT } from '../const'

export const updateUserPassword = async (id_user, oldPassword, newPassword) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.post(SERVERPOINT + '/api/users/updateUserPassword', { id_user, oldPassword, newPassword }, config);
        return response.status;
    } catch (error) {
        throw error;
    }
}

export const updateUserInfos = async (user) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.post(SERVERPOINT + '/api/users/updateUserInfos', { user }, config);
        if(response.status == 200){
            localStorage.setItem('firstname', user.firstname);
            localStorage.setItem('lastname', user.lastname);
            localStorage.setItem('email', user.email);
            window.dispatchEvent(new Event('storage'));
            return response.status.message;
        }
    } catch (error) {
        throw error;
    }
}

