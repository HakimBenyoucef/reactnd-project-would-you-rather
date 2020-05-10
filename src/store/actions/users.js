export const UPDATE_USERS = "UPDATE_USERS";

export const updateUsers = (users) => {
  return {
    type: UPDATE_USERS,
    users,
  };
};
