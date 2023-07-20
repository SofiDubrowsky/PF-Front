import axios from "axios";

export const DELETE_USER = "DELETE_USER";

export function deleteUser(id) {
  return async function (dispatch) {
    const result = await axios.delete(`http://localhost:3001/users/${id}`);
    // const result = await axios.get(`https://sportiverse-server.onrender.com/users/${id}`);
    return dispatch({
      type: DELETE_USER,
      payload: result.data,
    });
  };
}
