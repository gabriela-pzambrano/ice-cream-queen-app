import { API_URL } from './API';
import axios from 'axios';

export const searchProducts = async (token, value, limit, page, type) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const products = await axios.get(
      `${API_URL}/products/${type}?${type}=${value}&page=${page}&limit=${limit || 12}`,
      config
    );
    console.log(products);
    return products.data;
  } catch (error) {
    console.log(error.response.data.error);
    return false;
  }
};