export const ORDER_BY_DATE = "ORDER_BY_DATE";
export const ALL_FILTERS_ADMIN = "ALL_FILTERS_ADMIN";
export const SET_FILTERS_ADMIN = "SET_FILTERS_ADMIN";
export const SET_ORDER_BY_DATE = "SET_ORDER_BY_DATE";

export const setFiltersAdmin = (payload) => {
  return {
    type: SET_FILTERS_ADMIN,
    payload,
  };
};

export const allFiltersAdmin = (payload) => {
  return {
    type: ALL_FILTERS_ADMIN,
    payload,
  };
};

export const orderDate = (payload) => {
  return {
    type: ORDER_BY_DATE,
    payload,
  };
};

export const setOrderByDate = (payload) => {
  return {
    type: SET_ORDER_BY_DATE,
    payload,
  };
}
