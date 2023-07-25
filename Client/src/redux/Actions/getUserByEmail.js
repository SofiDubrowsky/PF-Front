export const GET_USER_BY_EMAIL = "GET_USER_BY_EMAIL";

export const getUserByEmail = (email) => {
  console.log(email);
  return {
      type: GET_USER_BY_EMAIL,
      payload: email,
  }
};
