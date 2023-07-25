export const GET_USER_BAN_BY_NAME = "GET_USER_BAN_BY_NAME";

export const getUsersBanByName = (name) => {
  
    return{
      type: GET_USER_BAN_BY_NAME,
      payload: name,
    };
};
