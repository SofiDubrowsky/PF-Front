const GET_PLAYERS = "GET_PLAYERS";

import axios from 'axios'

export default function getPlayers() {
    return async function (dispatch) {
        var result = await axios.get('http://localhost:3000/players');
        return dispatch({
            type: GET_PLAYERS,
            payload: result.data
        })
    }
};