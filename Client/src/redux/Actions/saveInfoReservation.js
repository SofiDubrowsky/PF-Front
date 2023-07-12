export const SAVE_RESERVATION = "SAVE_RESERVATION"

export const saveInfoReservation = (payload) => {
  return {
    type: SAVE_RESERVATION,
    payload,
  };
}
