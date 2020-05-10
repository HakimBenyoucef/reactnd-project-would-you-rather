import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import users from "./reducers/users";
import questions from './reducers/questions' 
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  users: users,
  questions: questions,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

// Exports
export { store };
