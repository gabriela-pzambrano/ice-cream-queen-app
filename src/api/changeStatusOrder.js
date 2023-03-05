import { API_URL } from './API';
import axios from 'axios';

export const changeStatusOrder = async (token, newStatus, id) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    console.log(newStatus)
    const status = {
      "status": newStatus,
    };
    const orderChanged = await axios.put(
      `${API_URL}/orders/${id}`,
      status,
      config
    );
    console.log(orderChanged.data)
    return orderChanged.data;
  } catch (error) {
    console.log(error.response.data.error);
  }
};