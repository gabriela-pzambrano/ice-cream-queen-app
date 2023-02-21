import { API_URL } from './API';
import axios from 'axios';

export const searchProducts = async (token, value, limit, page) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const products = await axios.get(
      `${API_URL}/products/search?search=${value}&page=${page}&limit=${limit || 12}`,
      config
    );
    return products.data;
  } catch (error) {
    console.log(error.response.data.error);
  }
};