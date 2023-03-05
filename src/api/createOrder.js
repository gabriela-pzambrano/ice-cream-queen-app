import axios from "axios";
import { API_URL } from './API';
import { toast } from "react-toastify";

export const createOrder = async (token, order) => {
    try {
        const config = {
            headers: { Authorization: `Bearer ${token}` },
        }
        await axios.post(`${API_URL}/orders`, order, config);
        toast.success("Se creo la órden correctamente");
        return "La órden se creo correctamente";
    } catch (error) {
        toast.error(error.response.data.error);
    }
};