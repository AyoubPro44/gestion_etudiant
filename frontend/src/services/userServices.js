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
