import axios from "axios";

export const LOGIN_GOOGLE = 'LOGIN_GOOGLE';

export const loginGoogle = (user) => {
    console.log(user);
    return async function (dispatch) {
      try {
        const response = await axios.post("http://localhost:3001/login/google", user);
        console.log(response.data);
        return  dispatch({type: LOGIN_GOOGLE, payload: response.data});
      } catch (error) {
        throw error;
      }
      
    };
};