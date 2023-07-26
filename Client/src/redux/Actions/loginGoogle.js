import axios from "axios";

export const LOGIN_GOOGLE = 'LOGIN_GOOGLE';

export const loginGoogle = (user) => {
    return async function (dispatch) {
      try {
        // const response = await axios.post("http://localhost:3001/login/google", user);
        const response = await axios.post("https://sportiverse-server.onrender.com/login/google", user);
        return  dispatch({type: LOGIN_GOOGLE, payload: response.data.response[0]});
      } catch (error) {
        throw error;
      }
      
    };
};