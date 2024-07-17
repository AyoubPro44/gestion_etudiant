import axios from 'axios';
import { SERVERPOINT } from '../const'

export const getReports = async () => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.get(SERVERPOINT + '/api/reports/getReports', config);
        if (response.status === 200) {
            return response.data.reports;
        }
    } catch (error) {
        throw error;
    }
}
