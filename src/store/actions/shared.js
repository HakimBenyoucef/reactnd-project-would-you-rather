import { updateUsers } from "./users";
import { updateQuestions } from "./questions";
import { getInitialData } from "../../utils/_DATA";

export function initData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(updateUsers(Object.values(users)));
      dispatch(updateQuestions(Object.values(questions)));
    });
  };
}
