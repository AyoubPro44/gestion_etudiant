import axios from "axios";
import { SERVERPOINT } from "../const";


const handleGetImage = async (dir, image_name) => {
    const url = `${SERVERPOINT}/secure-uploads/${dir}/${image_name}`;
    const token = localStorage.getItem('token');

    try {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
            responseType: 'blob'
        });

        const imageUrl = URL.createObjectURL(response.data);
        return imageUrl;
    } catch (error) {
        throw error;
    }
};
