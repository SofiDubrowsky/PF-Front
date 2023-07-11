export const LOGOUT = 'LOGOUT';

export const logout = () => {
    return async function (dispatch) {

        return  dispatch({type: LOGOUT});
    }
};