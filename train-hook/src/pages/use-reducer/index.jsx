import { useReducer } from "react";
import Counter2 from "./index2";

const initialState = { count: 0 };
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

const UseReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "decrement", payload: 2 })}>
        -
      </button>
      <button onClick={() => dispatch({ type: "increment", payload: 2 })}>
        +
      </button>
      <br />
      <br />
      <Counter2 initCount={11} />
    </div>
  );
};

export default UseReducer;
