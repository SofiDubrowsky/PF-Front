import axios from "axios";

export const GET_USER_BY_NAME = "GET_USER_BY_NAME";

export const getUsersByName = (name) => {
  return async function (dispatch) {
    const response = await axios.get(
      `http://localhost:3001/users/${name}/name`
      // `https://sportiverse-server.onrender.com/users/${name}/name`
    );
    dispatch({
      type: GET_USER_BY_NAME,
      payload: response.data,
    });
  };
};
