import { API_URL } from './API';
import axios from 'axios';

export const getUsers = async (token, limit, page) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const users = await axios.get(
      `${API_URL}/users?page=${page}&limit=${limit || 12}`,
      config
    );
    return users.data;
  } catch (error) {
    console.log(error.response.data.error);
  }
};