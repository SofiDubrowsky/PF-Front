import axios from "axios";

export const DELETE_RESERVATION = "DELETE_RESERVATION";

export function deleteReservation(id) {
  return async function (dispatch) {
     
    // const result = await axios.delete(`http://localhost:3001/reservations/${id}`);
    const result = await axios.delete(`https://sportiverse-server.onrender.com/reservations/${id}`);
    return dispatch({
      type: DELETE_RESERVATION,
      payload: result.data,
    });
  };
}
