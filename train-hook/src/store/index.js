import { createStore, applyMiddleware, combineReducers } from "redux";
// Redux 的基本做法, 用户发出 Action，Reducer 函数算出新的 State，View 重新渲染
// 异步操作怎么办？Action 发出以后，Reducer 立即算出 State，这叫做同步；Action 发出以后，过一段时间再执行 Reducer，这就是异步。
// 怎么才能 Reducer 在异步操作结束后自动执行呢？这就要用到新的工具：中间件（middleware）
// 中间件就是一个函数，对store.dispatch方法进行了改造(功能增强)，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能
import thunk from "redux-thunk";
import reducer1 from "./reducer1";
import reducer2 from "./reducer2";

const reducer = combineReducers({
  reducer1,
  reducer2
});
// const api = "http://www.example.com/";

const store = createStore(
  reducer,
  // applyMiddleware(thunk.withExtraArgument({ api }))
  applyMiddleware(thunk)
);

export default store;
