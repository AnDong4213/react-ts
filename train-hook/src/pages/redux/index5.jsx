import React, { useState, useCallback, useRef, useEffect, memo } from "react";
import { createSet, createAdd, createRemove, createToggle } from "./actions";

import "./index.css";

let idSeq = Date.now();
const LS_KEY = "_$-todos_";

// function Control(props) {
const Control = memo((props) => {
  // console.log("props", props);
  const { addTodo } = props;
  const inputRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();

    const newText = inputRef.current.value.trim();
    if (!newText.length) {
      return;
    }
    addTodo({
      id: ++idSeq,
      text: newText,
      complete: false
    });

    inputRef.current.value = "";
  };

  return (
    <div className="control">
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          ref={inputRef}
          className="new-todo"
          placeholder="What needs to be  done"
        />
      </form>
    </div>
  );
});

function TodoItem(props) {
  const {
    todo: { id, text, complete },
    toggleTodo,
    removeTodo
  } = props;

  const onChange = () => {
    toggleTodo(id);
  };

  const onRemove = () => {
    removeTodo(id);
  };

  return (
    <li className="todo-item">
      <input type="checkbox" onChange={onChange} checked={complete} />
      <label className={complete ? "complete" : ""}>{text}</label>
      <button onClick={onRemove}>×</button>
    </li>
  );
}
function Todos(props) {
  // console.log("props", props);
  const { removeTodo, toggleTodo, todos } = props;
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          className="todos"
          key={todo.id}
          todo={todo}
          removeTodo={removeTodo}
          toggleTodo={toggleTodo}
        ></TodoItem>
      ))}
    </ul>
  );
}

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [incrementCount, setIncrementCount] = useState(0);

  // useEffect(() => {}, []);

  const dispatch = useCallback(
    (action) => {
      const state = {
        todos,
        incrementCount
      };
      const setters = {
        todos: setTodos,
        incrementCount: setIncrementCount
      };

      const newState = reducer(state, action);
      for (let key in newState) {
        setters[key](newState[key]);
      }
    },
    [todos, incrementCount]
  );

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LS_KEY));
    dispatch(createSet(todos));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos || "[]"));
  }, [todos]);

  return (
    <div className="todo-list">
      <Control {...bindActionCreators({ addTodo: createAdd }, dispatch)} />
      <hr />
      <Todos
        todos={todos}
        {...bindActionCreators(
          { removeTodo: createRemove, toggleTodo: createToggle },
          dispatch
        )}
      />
    </div>
  );
}

function bindActionCreators(actionCreators, dispatch) {
  const ret = {};
  for (let key in actionCreators) {
    ret[key] = function (...args) {
      // const actionCreator = actionCreators[key];
      const action = actionCreators[key](...args);
      dispatch(action);
    };
  }
  return ret;
}

const reducers = {
  todos(state, action) {
    const { type, payload } = action;
    switch (type) {
      case "set":
        return payload;
      case "add":
        return [...state, payload];
      case "remove":
        return state.filter((todo) => todo.id !== payload);
      case "toggle":
        return state.map((todo) =>
          todo.id === payload
            ? {
                ...todo,
                complete: !todo.complete
              }
            : todo
        );
      default:
        return state;
    }
  },
  incrementCount(state, action) {
    const { type } = action;
    switch (type) {
      case "set":
      case "add":
        return state + 1;
      default:
        return state;
    }
  }
};

function combineReducers(reducers) {
  return (state, action) => {
    const changed = {};
    for (let key in reducers) {
      changed[key] = reducers[key](state[key], action);
    }
    return {
      ...state,
      ...changed
    };
  };
}

const reducer = combineReducers(reducers);
// console.log(reducer);
export default TodoList;

/* const combineReducers = (reducers) => {
  return (state = {}, action) =>
    Object.keys(reducers).reduce((nextState, key) => {
      // 这种写法有一个前提，就是 State 的属性名必须与子 Reducer 同名。
      nextState[key] = reducers[key](state[key], action);
      return { ...state, ...nextState };
    }, {});
}; */

/* function reducer(state, action) {
  const { type, payload } = action;
  const { todos, incrementCount } = state;

  switch (type) {
    case "set":
      return {
        ...state,
        todos: payload,
        incrementCount: incrementCount + 1
      };
    case "add":
      return {
        ...state,
        todos: [...todos, payload],
        incrementCount: incrementCount + 1
      };
    case "remove":
      return {
        ...state,
        todos: todos.filter((todo) => todo.id !== payload)
      };
    case "toggle":
      return {
        ...state,
        todos: todos.map((todo) =>
          todo.id === payload
            ? {
                ...todo,
                complete: !todo.complete
              }
            : todo
        )
      };
    default:
      return state;
  }
} */
