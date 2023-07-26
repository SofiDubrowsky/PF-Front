import axios from "axios";

export const GET_STORES = 'GET_STORES';

export const getStores= () => {
    return async (dispatch) => {

        //  const {data} = await axios.get('http://localhost:3001/stores');

        const {data} = await axios.get('https://sportiverse-server.onrender.com/stores');
        return dispatch({ type: GET_STORES, payload: data });
    }
};
