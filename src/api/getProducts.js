import axios from "axios";
import { API_URL } from "./API";

export const getProducts = async (token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const products = await axios.get(`${API_URL}/products`, config);
    console.log(products.data);
    return products.data;
  } catch (error) {
    console.log(error.response.data.error);
  }
};