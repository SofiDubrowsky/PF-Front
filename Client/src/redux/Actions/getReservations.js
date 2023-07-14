import axios from "axios";

export const GET_RESERVATIONS = "GET_RESERVATIONS";


export const getReservations= () => {
    return async (dispatch) => {
        const {data} = await axios.get('https://sportiverse-server.onrender.com/reservations');
        return dispatch({ type: GET_RESERVATIONS, payload: data });
    }
};
