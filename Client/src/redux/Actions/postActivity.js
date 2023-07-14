import axios from 'axios'

export const POST_ACTIVITY = "POST_ACTIVITY";

export const postActivity = (payload) => {
    return async (dispatch) => {
        let info = await axios.post('https://sportiverse-server.onrender.com/activities',payload);
        console.log(payload);
        return dispatch({ type: POST_ACTIVITY, payload: info.data });
    }
}

