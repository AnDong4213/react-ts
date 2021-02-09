import React, { useState, useRef, useEffect } from "react";
import { createSet, createAdd, createRemove, createToggle } from "./actions";

import "./index.css";

const LS_KEY = "_$-todos_";
let store = {
  todos: [],
  incrementCount: 0
};

function bindActionCreators(actionCreators, dispatch) {
  const ret = {};
  for (let key in actionCreators) {
    ret[key] = function (...args) {
      const actionCreator = actionCreators[key];
      const action = actionCreator(...args);
      dispatch(action);
    };
  }

  return ret;
}

function combineReducers(reducers) {
  return function reducer(state, action) {
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

/* const combineReducers = (reducers) => {
  return (state = {}, action) => {
    return Object.keys(reducers).reduce((nextState, key) => {
      nextState[key] = reducers[key](state[key], action);
      return { ...state, ...nextState };
    }, {});
  };
}; */

function Control(props) {
  console.log("Control--props", props);
  const { addTodo } = props;
  const inputRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();

    const newText = inputRef.current.value.trim();
    if (!newText.length) {
      return;
    }
    addTodo(newText);

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
}

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
  console.log("Todos-props", props);
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

  useEffect(() => {
    Object.assign(store, { todos, incrementCount });
  }, [todos, incrementCount]);

  const dispatch = (action) => {
    const setters = {
      todos: setTodos,
      incrementCount: setIncrementCount
    };

    if (typeof action === "function") {
      action(dispatch, () => store);
      return;
    }

    const newState = reducer(store, action);
    for (let key in newState) {
      setters[key](newState[key]);
    }
  };

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

const reducer = combineReducers(reducers);

export default TodoList;
