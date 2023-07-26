import axios from "axios";

export const GET_BAN_USERS = "GET_BAN_USERS";

export function getBanUsers() {
  return async function (dispatch) {
    // const result = await axios.get("http://localhost:3001/users/ban/users");
    const result = await axios.get(`https://sportiverse-server.onrender.com/users/ban/users`);
    return dispatch({
      type: GET_BAN_USERS,
      payload: result.data,
    });
  };
}