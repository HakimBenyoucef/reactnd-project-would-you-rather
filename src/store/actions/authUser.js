export const SET_AUTH_USER = "SET_AUTH_USER";

export default function setAuthUser(user) {
  return {
    type: SET_AUTH_USER,
    user,
  };
}
