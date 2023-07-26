import axios from "axios";

export const DELETE_STORE = "DELETE_STORE";

export function deleteStore(id) {
  return async function (dispatch) {
    // const result = await axios.delete(`http://localhost:3001/stores/${id}`);
    const result = await axios.delete(`https://sportiverse-server.onrender.com/stores/${id}`);
    return dispatch({
      type: DELETE_STORE,
      payload: result.data,
    });
  };
}
