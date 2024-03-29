import axios from "axios";

export const GET_ACTIVITIES = "GET_ACTIVITIES";

export const getActivities =  () => {
  return async function (dispatch) {
    // const result = await axios.get("http://localhost:3001/activities");
    const result = await axios.get("https://sportiverseback.onrender.com/activities");

    return dispatch({
      type: GET_ACTIVITIES,
      payload: result.data,
    });
  };
}
