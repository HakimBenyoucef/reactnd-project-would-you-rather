export const SET_AUTH_USER = "SET_AUTH_USER";

export const  setAuthUser = (user) =>{
  return {
    type: SET_AUTH_USER,
    user,
  };
}
