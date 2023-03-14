import { API_URL } from './API';
import axios from 'axios';
import { toast } from 'react-toastify';

export const updateUser = async (token, id, user) => {
  let rol;
  if (user === 'Chef') {
    rol = {
      admin: false,
      cocina: true,
    };
  } else if (user === 'Administrador') {
    rol = {
      admin: true,
      cocina: false,
    };
  }
  else{
    rol = {
      admin: false,
      cocina: false,
    };
  }

  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    await axios.put(`${API_URL}/users/${id}`, {roles: rol}, config);
    toast.success('Se cambio el rol del usuario');
    return 'Se realizó la modificación correctamente';
  } catch (error) {
    console.log(error.response.data.error);
    return false;
  }
};