import axios from "axios";
import { API_URL } from './API';
import { toast } from "react-toastify";

export const createUser = async (token, user) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        }
        await axios.post(`${API_URL}/users`, user, config);
        toast.success("Se creo el usuario correctamente");
        return "El usuario se creo correctamente"
    } catch (error) {
        toast.error(error.response.data.error);
    }
};