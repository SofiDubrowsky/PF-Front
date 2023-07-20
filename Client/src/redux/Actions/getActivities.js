import axios from "axios";

export const GET_ACTIVITIES = "GET_ACTIVITIES";

export default function getActivities() {
  return async function (dispatch) {
    const result = await axios.get("http://localhost:3001/activities");
    //const result = await axios.get("https://sportiverse-server.onrender.com/activities");

    return dispatch({
      type: GET_ACTIVITIES,
      payload: result.data,
    });
  };
}
