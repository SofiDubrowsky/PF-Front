import axios from 'axios'

export const POST_RESERVATION = "POST_RESERVATION";

export const postReservation = (reservation) => {
    return async (dispatch) => {
        const info = await axios.post('http://localhost:3001/reservations', reservation);
        const existingReservation = localStorage.getItem('reservation');
        if (existingReservation) {
            localStorage.removeItem('reservation');
          }
        localStorage.setItem('reservation', JSON.stringify(info.data))
        return dispatch({ type: POST_RESERVATION, payload: info.data });

    }
}