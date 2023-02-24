import { API_URL } from './API';
import axios from 'axios';

export const getOrders = async (token, limit, page) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const orders = await axios.get(
      `${API_URL}/orders?page=${page}&limit=${limit || 12}`,
      config
    );
    return orders.data;
  } catch (error) {
    console.log(error.response.data.error);
  }
};