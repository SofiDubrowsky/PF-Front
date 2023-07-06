import axios from 'axios';

export const GET_ACT_BY_NAME = "GET_ACT_BY_NAME";

export default function getActByName(name) {
    return async function (dispatch) {
        try {
            var result = await axios.get(`http://localhost:3001/activities?name=${name}`);
            console.log(result)
            return dispatch({
                type: GET_ACT_BY_NAME,
                payload: result.data
            })
        } catch (error) {
            console.log('Error in Action GET_ACT_BY_NAME: ', error)
        }
    }
}
