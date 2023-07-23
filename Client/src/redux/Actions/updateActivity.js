import axios from "axios";

export const UPDATE_ACTIVITY = "UPDATE_ACTIVITY";

export const updateActivity = (form) => {
  return async (dispatch) => {
    // const id = localStorage.getItem("clientId");
    //  const info = await axios.put(`https://sportiverse-server.onrender.com/activities/${id}`, form);
    const info = await axios.put(`http://localhost:3001/activities/${id}`, form);
    return dispatch({ type: UPDATE_ACTIVITY, payload: info.data });
  };
};
