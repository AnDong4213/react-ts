import { addListApi } from "../services/example";

export default {
  namespace: "products",
  state: [
    { name: "dva", id: 1 },
    { name: "antd", id: 2 },
  ],
  reducers: {
    delete33(state, { payload: id }) {
      return state.filter((item) => item.id !== id);
    },
    add33(state, { payload }) {
      console.log(payload)
      return [...state, payload];
    },
  },
  effects: {
    *addList229(action, { call, put, select }) {
      console.log(action)
      const response = yield call(addListApi);
      const pro = yield select(state => state.products);
      console.log(pro)
      // yield console.log(response);

      yield put({
        type: "add33",
        payload: response,
      });
    },
  },
};

/* Generator 函数
Effect 是一个 Generator 函数，内部使用 yield 关键字，标识每一步的操作（不管是异步或同步）。

#call 和 put
dva 提供多个 effect 函数内部的处理函数，比较常用的是 call 和 put。

call：执行异步函数
put：发出一个 Action，类似于 dispatch */
