import { useReducer } from "react";

function init(initialCount) {
  console.log("initialCount", initialCount);
  return { count: initialCount };
}
function reducer(state, action) {
  const { type, payload = 2 } = action;

  switch (type) {
    case "increment":
      return { count: state.count + payload };
    case "decrement":
      return { count: state.count - payload };
    case "reset":
      return init(action.payload);
    default:
      console.log("action", action);
      return { ...state, ...action };
  }
}

function Counter2({ initialCount }) {
  const [state, dispatch] = useReducer(reducer, initialCount, init);

  return (
    <h2>
      Count: {state.count}
      <br />
      <button
        onClick={() => dispatch({ type: "reset", payload: initialCount })}
      >
        Reset
      </button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment", payload: 5 })}>
        +
      </button>
      <button onClick={() => dispatch({ count: 99 })}>哈哈</button>
      <button onClick={() => dispatch({ count: state.count + 10 })}>
        呵呵
      </button>
    </h2>
  );
}

export default Counter2;
