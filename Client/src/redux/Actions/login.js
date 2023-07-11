import axios from "axios";

export const LOGIN = 'LOGIN';

export const login = (user) => {
    return async function (dispatch) {
      try {
        const response = await axios.post("http://localhost:3001/login", user);
        const homeURL = response.data.homeURL;
  
        // Redirigir al usuario al home si se recibe la URL del home en la respuesta
        if (homeURL) {
          window.location.href = homeURL;
        }
  
        return  response;
      } catch (error) {
        throw error;
      }
    };
  };