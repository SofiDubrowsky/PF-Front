import axios from "axios";

export const LOGIN = 'LOGIN';

export const login = (user) => {
    return async function (dispatch) {
      try {
        //  const response = await axios.post("http://localhost:3001/login", user);
        const response = await axios.post("https://sportiverseback.onrender.com/login", user);
        return  dispatch({type: LOGIN, payload: response.data});
      } catch (error) {
        throw error;
      }
      
    };
};
