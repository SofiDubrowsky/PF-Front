import axios from "axios";

export const DELETE_ACTIVITY = "DELETE_ACTIVITY";

export const deleteActivity = (id) => {
  return async function (dispatch) {
    // const result = await axios.delete(`http://localhost:3001/activities/${id}`);
    const result = await axios.delete(`https://sportiverse-server.onrender.com/activities/${id}`);
    return dispatch({
      type: DELETE_ACTIVITY,
      payload: result.data,
    });
  };
}
