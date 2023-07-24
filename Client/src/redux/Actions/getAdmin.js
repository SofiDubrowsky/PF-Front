import axios from "axios";

export const GET_ADMINS = "GET_ADMINS";

export const getAdmins =  () => {
  return async function (dispatch) {
    const result = await axios.get("http://localhost:3001/admin");
    // const result = await axios.get("https://sportiverse-server.onrender.com/admin");

    return dispatch({
      type: GET_ADMINS,
      payload: result.data,
    });
  };
}
