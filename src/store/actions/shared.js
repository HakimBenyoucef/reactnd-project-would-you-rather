import { receiveUsers } from "./users";
import { receiveQuestions } from "./questions";
import { getInitialData } from "../../utils/_DATA";

export function initData() {
  return (dispatch) => {
    return getInitialData().then(({ users, questions }) => {
      dispatch(receiveUsers(Object.values(users)));
      dispatch(receiveQuestions(Object.values(questions)));
    });
  };
}
