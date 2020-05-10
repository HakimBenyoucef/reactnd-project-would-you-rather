import { SET_AUTH_USER } from "../actions/authUser";

export default authUser = (state = {}, action) => {
  switch (action.type) {
    case SET_AUTH_USER:
      return { ...state, user: action.user };

    default:
      return state;
  }
};
