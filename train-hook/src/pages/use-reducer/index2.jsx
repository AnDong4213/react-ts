import { useReducer } from "react";

function init(initialCount) {
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
      throw new Error();
  }
}

function Counter2({ initCount }) {
  const [state, dispatch] = useReducer(reducer, initCount, init);

  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "reset", payload: initCount })}>
        {" "}
        Reset
      </button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
    </>
  );
}

export default Counter2;
