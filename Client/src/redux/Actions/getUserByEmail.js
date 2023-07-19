import axios from "axios";

export const GET_USER_BY_EMAIL = "GET_USER_BY_EMAIL";

export const getUserByEmail = (email) => {
  return async function (dispatch) {
    const response = await axios.get(
      // `http://localhost:3001/reservations/${email}/email`
      `https://sportiverse-server.onrender.com/reservations/${email}/email`
    );
    dispatch({
      type: GET_USER_BY_EMAIL,
      payload: response.data,
    });
  };
};
