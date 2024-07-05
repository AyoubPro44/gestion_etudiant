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
        if(response.status === 200) {
            return response.data.courses;
        }
    } catch (error) {
        throw error;
    }
}