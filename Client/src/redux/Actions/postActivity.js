import axios from 'axios'

export const POST_ACTIVITY = "POST_ACTIVITY";

export const postActivity = (payload) => {
    return async (dispatch) => {
        let info = await axios.post('http://localhost:3000/activities',payload);
        return dispatch({ type: POST_ACTIVITY, payload: info.data });
    }
}

