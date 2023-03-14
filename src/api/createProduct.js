import axios from 'axios';
import { API_URL } from './API';
import { toast } from 'react-toastify';

export const createProduct = async (token, product) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios.post(`${API_URL}/products`, product, config);
    toast.success('Se creo el producto correctamente');
    return 'El producto se creo correctamente';
  } catch (error) {
    toast.error(error.response.data.error);
  }
};
