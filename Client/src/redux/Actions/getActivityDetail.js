import axios from "axios"

export const GET_ACTIVITY_DETAIL = "GET_ACTIVITY_DETAIL"

export const getActivityDetail=(id)=>{
    return async(dispatch)=>{
         let info = await axios.get(`http://localhost:3001/activities/${id}`);
        //let info = await axios.get(`https://sportiverse-server.onrender.com/activities/${id}`);
        return dispatch({type:GET_ACTIVITY_DETAIL,payload:info.data})
    }
}
