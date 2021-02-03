import React, { useState, useCallback, useRef, useEffect } from "react";
import { createSet, createAdd, createRemove, createToggle } from "./actions";

import "./index.css";

let idSeq = Date.now();
const LS_KEY = "_$-todos_";

function Control(props) {
  const { dispatch } = props;
  const inputRef = useRef();

  const onSubmit = (e) => {
    e.preventDefault();

    const newText = inputRef.current.value.trim();
    if (!newText.length) {
      return;
    }
    dispatch(
      createAdd({
        id: ++idSeq,
        text: newText,
        complete: false
      })
    );

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
    dispatch
  } = props;

  const onChange = () => {
    dispatch(createToggle(id));
  };

  const onRemove = () => {
    dispatch(createRemove(id));
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
  const { dispatch, todos } = props;
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          className="todos"
          key={todo.id}
          todo={todo}
          dispatch={dispatch}
        ></TodoItem>
      ))}
    </ul>
  );
}

function TodoList() {
  const [todos, setTodos] = useState([]);

  const dispatch = useCallback((action) => {
    const { type, payload } = action;
    switch (type) {
      case "set":
        setTodos(payload);
        break;
      case "add":
        setTodos((todos) => [...todos, payload]);
        break;
      case "remove":
        setTodos((todos) => todos.filter((todo) => todo.id !== payload));
        break;
      case "toggle":
        setTodos((todos) =>
          todos.map((todo) =>
            todo.id === payload
              ? {
                  ...todo,
                  complete: !todo.complete
                }
              : todo
          )
        );
        break;
      default:
        break;
    }
  }, []);

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
      <Control dispatch={dispatch} />
      <Todos todos={todos} dispatch={dispatch} />
    </div>
  );
}

export default TodoList;
