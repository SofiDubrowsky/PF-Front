import axios from 'axios'

export const GET_ACTIVITIES = 'GET_ACTIVITIES';

export default function getActivities() {
    return async function (dispatch) {
        var result = await axios.get('http://localhost:3001/activities');
<<<<<<< Updated upstream
        console.log(result)
=======
>>>>>>> Stashed changes
        return dispatch({
            type: GET_ACTIVITIES,
            payload: result.data
        })
    }
};

