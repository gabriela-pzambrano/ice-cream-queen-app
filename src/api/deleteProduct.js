import { API_URL } from './API';
import axios from 'axios';
import { toast } from 'react-toastify';

export const deleteProduct = async (token, id) => {
  console.log(token);
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios.delete(`${API_URL}/products/${id}`, config);
    toast.success('Se eliminó el producto correctamente');
    return 'Se eliminó el producto correctamente';
  } catch (error) {
    console.log(error.response.data.error);
    return false;
  }
};
