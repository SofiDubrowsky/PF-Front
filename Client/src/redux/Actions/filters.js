//por edad
//por sucursal

export const ORDER_BY_COST = "ORDER_BY_COST";
export const ALL_FILTER = "ALL_FILTER";
export const SET_FILTERS = "SET_FILTERS"
export const SET_ORDER = "SET_ORDER"

export const setFilters = (payload) => {
  return {
    type: SET_FILTERS,
    payload,
  };
}

export const orderCost = (payload) => {
  return {
    type: ORDER_BY_COST,
    payload,
  };
};

export const setOrder = (payload) => {
  return {
    type: SET_ORDER,
    payload,
  };
}

export const allFilters = (payload) => {
    return{
        type: ALL_FILTER,
        payload
    }
}
