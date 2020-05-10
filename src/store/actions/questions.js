export const UPDATE_QUESTIONS = "UPDATE_QUESTIONS";


export const updateQuestions = (questions) => {
  return {
    type: UPDATE_QUESTIONS,
    questions,
  };
};
