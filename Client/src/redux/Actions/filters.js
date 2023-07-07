//por edad
//por sucursal

export const ORDER_BY_COST = "ORDER_BY_COST";
export const FILTER_BY_PLAYERS = "FILTER_BY_PLAYERS";
export const FILTER_BY_ACTIVITY = "FILTER_BY_ACTIVITY";

export const orderCost = (payload) => {
  return {
    type: ORDER_BY_COST,
    payload,
  };
};

export const filterByPlayers = (payload) => {
    return{
        type: FILTER_BY_PLAYERS,
        payload
    }
}

export const filterByActivity = (payload) => {
  return{
    type: FILTER_BY_ACTIVITY,
    payload
}
}