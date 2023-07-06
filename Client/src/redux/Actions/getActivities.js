const GET_ACTIVITIES = 'GET_ACTIVITIES';

import axios from 'axios'

export default function getActivities() {
    return async function (dispatch) {
        var result = await axios.get('http://localhost:3000/activities');
        console.log(result)
        return dispatch({
            type: GET_ACTIVITIES,
            payload: result.data
        })
    }
};

