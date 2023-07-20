import axios from 'axios'

export const PUT_USER = "PUT_USER";

export const updateUser = (user) => {
    return async (dispatch) => {
           
        const id = localStorage.getItem('clientId');
    //  const info = await axios.put(`https://sportiverse-server.onrender.com/users/${id}`, user);
        const info = await axios.put(`http://localhost:3001/users/${id}`, user);
        return dispatch({ type: PUT_USER, payload: info.data });

    }
}