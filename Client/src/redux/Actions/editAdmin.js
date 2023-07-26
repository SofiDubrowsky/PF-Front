import axios from 'axios'

export const EDIT_ADMIN = "EDIT_ADMIN";

export const editAdmin = (id, password) => {
    return async (dispatch) => {
           
    //  const info = await axios.put(`https://sportiverse-server.onrender.com/users/${id}`, user);
        const info = await axios.put(`http://localhost:3001/admin/${id}`, password);
        console.log(info.data);
        console.log(id);
        console.log(password);
        return dispatch({ type: EDIT_ADMIN, payload: password });
    }
}