import axios from "axios";

export const RESTORE_USER = 'RESTORE_USER';

export const restoreUser = (id) => {
    return async function () {
      // const response = await axios.put(`http://localhost:3001/users/${id}/restore`);
      const response = await axios.put(`https://sportiverseback.onrender.com/users/${id}/restore`);
      return response;
    };
};