import { API_URL } from './API';
import axios from 'axios';
import { toast } from 'react-toastify';

export const updateUser = async (token, id) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios.put(`${API_URL}/users/${id}`, config);
    toast.success('Se cambio el rol del usuario');
    console.log("cambios");
    return 'Se realizó la modificación correctamente';
  } catch (error) {
    console.log(error.response.data.error);
    return false;
  }
};