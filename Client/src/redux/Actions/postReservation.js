import axios from 'axios'

export const POST_RESERVATION = "POST_RESERVATION";

export const postActivity = (reservation) => {
    return async (dispatch) => {
        const info = await axios.post('http://localhost:3001/reservations', reservation);
        return dispatch({ type: POST_RESERVATION, payload: info.data });
    }
}

