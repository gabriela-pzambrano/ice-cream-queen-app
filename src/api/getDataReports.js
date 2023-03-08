import axios from 'axios';

export const getReports = async (token) => {
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const reports = await axios.get(`https://dev001-burger-queen-api-production.up.railway.app/reports/`, config);
    console.log(reports.data);
    return reports.data;
  } catch (error) {
    return false;
  }
};