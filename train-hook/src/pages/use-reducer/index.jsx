import { useReducer } from "react";
import { ReducerContext } from './context'
import Counter2 from "./index2";
import DeepTree from './deepTree'

const initialState = { count: 0, age: 0, name: '安安' };
const initialState2 = [{ id: (Math.random() * 10000).toFixed(4), text: (Math.random() * 10000).toFixed(2) }]

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "increment":
      return { count: state.count + payload };
    case "decrement":
      return { count: state.count - 1 };
    default:
      throw new Error();
  }
}

function reducer2(state, action) {
  const { type, payload } = action;
  console.log(payload)
  switch (type) {
    case "add":
      return [...state, payload];
    default:
      throw new Error();
  }
}

const UseReducer = () => {
  const [state, dispatch1] = useReducer(reducer, initialState);
  const [todos, dispatch2] = useReducer(reducer2, initialState2);

  const getTodos = () => {
    console.log(todos)
  }

  return (
    <section>
      <div style={{ marginBottom: 20 }}>
        <ReducerContext.Provider value={dispatch2}>
          <DeepTree todos={todos} />
        </ReducerContext.Provider>
        <button onClick={getTodos}>获取todos</button>
      </div>
      Count: {state.count}
      <button onClick={() => dispatch1({ type: "decrement", payload: 2 })}>
        -
      </button>
      <button onClick={() => dispatch1({ type: "increment", payload: 2 })}>
        +
      </button>
      <br />
      <br />
      <Counter2 initialCount={12} />
    </section>
  );
};

export default UseReducer;
