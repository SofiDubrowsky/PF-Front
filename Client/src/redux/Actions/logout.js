export const LOGOUT = 'LOGOUT';

export const logout = () => {
    return async function (dispatch) {
        localStorage.setItem("clientId", "")
        localStorage.setItem("isClient", 0)
        localStorage.setItem("access", false)
        return  dispatch({type: LOGOUT});
    }
};