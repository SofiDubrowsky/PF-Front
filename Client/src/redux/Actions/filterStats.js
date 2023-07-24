export const SET_FILTER_STATS = "SET_FILTER_STATS";

export const setFilterStats = (payload) => {
    return{
        type: SET_FILTER_STATS,
        payload,
    }
}