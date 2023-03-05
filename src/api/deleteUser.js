import { API_URL } from './API';
import axios from 'axios';
import { toast } from 'react-toastify';

export const deleteUser = async (token, id) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios.delete(`${API_URL}/users/${id}`, config);
    toast.success('Se eliminó el usuario correctamente');
    console.log("fafas");
    return 'Se eliminó el usuario correctamente';
  } catch (error) {
    console.log(error.response.data.error);
    return false;
  }
};
