import axios from "axios";

export const CREATE_USER = 'CREATE_USER';

export const createUser = (user) => {
    return async function () {
      const response = await axios.post(
        //  "http://localhost:3001/users", user);
       "https://sportiverseback.onrender.com/users", user);
      return response;
    };
};
