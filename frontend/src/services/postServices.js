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
        if (response.status === 200) {
            return response.data.posts;
        }
    } catch (error) {
        throw error;
    }
}

export const addNewPost = async (id_admin, title, description, image) => {
    try {
        const formData = new FormData();
        formData.append('id_admin', id_admin);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image);

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        };
        const response = await axios.post(`${SERVERPOINT}/api/posts/newPost`, formData, config);
        if (response.status === 200) {
            return response.data.newPost;
        } else {
            throw new Error('Failed to create new post');
        }
    } catch (error) {
        throw error;
    }
};

export const updatePost = async (id_post, title, description, image, isImageEdited) => {
    try {
        const formData = new FormData();
        formData.append('id_post', id_post);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image);
        formData.append('isImageEdited', isImageEdited);

        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'multipart/form-data'
            }
        };

        const response = await axios.post(`${SERVERPOINT}/api/posts/updatePost`, formData, config);
        if (response.status === 200) {
            return response.data.message; // Assuming your backend returns a success message
        } else {
            throw new Error('Failed to update post');
        }
    } catch (error) {
        throw error;
    }
};

export const deletePost = async (id_post, image_name) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
            },
            withCredentials: true,
        };
        const response = await axios.post(SERVERPOINT + '/api/posts/deletePost', { id_post, image_name }, config);
        if (response.status === 200) {
            return response;
        }
    } catch (error) {
        throw error;
    }
}