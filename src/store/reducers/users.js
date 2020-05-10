import { UPDATE_USERS } from "../actions/users";

export default function users(state = [], action) {
  switch (action.type) {
    case UPDATE_USERS:
      return { ...state, users: action.users };

    default:
      return state;
  }
}
