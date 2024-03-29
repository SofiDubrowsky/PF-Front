import axios from 'axios'

export const EDIT_ADMIN = "EDIT_ADMIN";

export const editAdmin = (id, password) => {
    return async (dispatch) => {
           
     const info = await axios.put(`https://sportiverseback.onrender.com/admin/${id}`, password);
        // const info = await axios.put(`http://localhost:3001/admin/${id}`, password);
       
        return dispatch({ type: EDIT_ADMIN, payload: password });
    }
}