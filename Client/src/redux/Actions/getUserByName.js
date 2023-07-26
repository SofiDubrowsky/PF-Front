import axios from "axios";

export const GET_USER_BY_NAME = "GET_USER_BY_NAME";

export const getUsersByName = (name) => {
  return{
    type: GET_USER_BY_NAME, payload: name
  }
};
