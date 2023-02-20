import { API_URL } from './API';
import axios from 'axios';

export const getProducts = async (token, limit, page) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const products = await axios.get(
      `${API_URL}/products?page=${page}&limit=${limit || 12}`,
      config
    );
    return products.data;
  } catch (error) {
    console.log(error.response.data.error);
  }
};