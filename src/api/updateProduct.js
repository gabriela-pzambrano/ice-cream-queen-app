import { API_URL } from './API';
import axios from 'axios';
import { toast } from 'react-toastify';

export const updateProduct = async (token, id, product) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const price = Number(product);
    await axios.put(`${API_URL}/products/${id}`, { price }, config);
    toast.success('Se actualizó el precio del producto');
    return 'Se actualizó el precio del producto';
  } catch (error) {
    console.log(error.response.data.error);
    return false;
  }
};