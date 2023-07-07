//por edad
//por sucursal

export const ORDER_BY_COST = "ORDER_BY_COST";
export const ALL_FILTER = "ALL_FILTER";


export const orderCost = (payload) => {
  return {
    type: ORDER_BY_COST,
    payload,
  };
};

export const allFilters = (payload) => {
    return{
        type: ALL_FILTER,
        payload
    }
}
