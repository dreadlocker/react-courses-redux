import { combineReducers } from "redux";
import courses from "./courseReducer";
import authors from "./authorReducer";
import apiStatusProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  courses,
  authors,
  apiStatusProgress,
});

export default rootReducer;
