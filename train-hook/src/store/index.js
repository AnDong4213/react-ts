import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import reducer1 from "./reducer1";
import reducer2 from "./reducer2";

const reducer = combineReducers({
  reducer1,
  reducer2
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;
