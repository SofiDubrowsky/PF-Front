import axios from "axios"

export const GET_USER = "GET_USER"

export const getUser=(id)=>{
    return async(dispatch)=>{
        let info = await axios.get(`http://localhost:3001/users/${id}`);
        return dispatch({type:GET_USER,payload:info.data})
    }
}