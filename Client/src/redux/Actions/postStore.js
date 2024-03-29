import axios from 'axios'

export const POST_STORE = "POST_STORE";

export const postStore = (store) => {
    return async (dispatch) => {
        
        // const info = await axios.post('http://:3001/stores', store);
        const info = await axios.post('https://sportiverseback.onrender.com/stores', store);
        
        return dispatch({ type: POST_STORE, payload: info.data });

    }
}