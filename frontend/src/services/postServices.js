import axios from 'axios';
import { SERVERPOINT } from '../const'

export const getAllPosts = async () => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.get(SERVERPOINT + '/api/posts/getPosts', config);
        if(response.status === 200) {
            return response.data.posts;
        }
    } catch (error) {
        throw error;
    }
}