import { UPDATE_QUESTIONS } from "../actions/questions";

export default function questions(state = [], action) {
  switch (action.type) {
    case UPDATE_QUESTIONS: {
      console.log(" == "+JSON.stringify(action.questions));
      return { ...state, questions: action.questions };
    }

    default:
      return state;
  }
}
