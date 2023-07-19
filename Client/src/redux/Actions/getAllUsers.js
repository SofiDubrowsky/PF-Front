import axios from "axios";

export const GET_ALL_USERS = "GET_ALL_USERS";

export function getAllUsers() {
  return async function (dispatch) {
    const result = await axios.get("http://localhost:3001/users");
    // const result = await axios.get(`https://sportiverse-server.onrender.com/users`);
    return dispatch({
      type: GET_ALL_USERS,
      payload: result.data,
    });
  };
}
