import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "./API";

export const login = async (user) => {
    try {
        const userLogin = await axios.post(`${API_URL}/auth`, user);
        toast.success("¡Éxito! Redirigiendo...");
        console.log(userLogin.data);
    } catch (error) {
        toast.error(error.response.data.error);
    }
};