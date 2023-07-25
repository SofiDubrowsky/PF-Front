import axios from "axios";

export const RESTORE_USER = 'RESTORE_USER';

export const restoreUser = (id) => {
    return async function () {
      const response = await axios.put(`http://localhost:3001/users/${id}/restore`);
       // "https://sportiverse-server.onrender.com/users", user);
      return response;
    };
};