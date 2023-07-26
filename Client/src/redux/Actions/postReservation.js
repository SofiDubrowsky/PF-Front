import axios from 'axios'

export const POST_RESERVATION = "POST_RESERVATION";

export const postReservation = (reservation) => {
    return async (dispatch) => {
        
        //  const info = await axios.post('http://localhost:3001/reservations', reservation);
        const info = await axios.post('https://sportiverse-server.onrender.com/reservations', reservation);
       
        localStorage.setItem('reservation', JSON.stringify(info.data))
        
        return dispatch({ type: POST_RESERVATION, payload: info.data });

    }
}
