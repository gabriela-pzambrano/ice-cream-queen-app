import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "./API";

export const login = async (user) => {
    try {
        const userLogin = await axios.post(`${API_URL}/auth`, user);
        const localStorageUser = userLogin.data;
        localStorage.setItem("user", JSON.stringify(localStorageUser.user));
        localStorage.setItem("token", JSON.stringify(localStorageUser.token));
        toast.success("¡Éxito! Redirigiendo...");
    } catch (error) {
        toast.error(error.response.data.error);
    }
};