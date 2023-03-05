import { API_URL } from './API';
import axios from 'axios';

export const searchUsers = async (token, email) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const users = await axios.get(
      `${API_URL}/users/${email}`,
      config
    );
    return [].concat(users.data);
  } catch (error) {
    console.log(error.response.data.error);
    return false;
  }
};