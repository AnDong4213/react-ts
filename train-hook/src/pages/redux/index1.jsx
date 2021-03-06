import React, { useState, useCallback, useRef, useEffect } from "react";

import "./index.css";

let idSeq = Date.now();
const LS_KEY = "_$-todos_";

function Control(props) {
  const { addTodo, count, onClick } = props;
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
      <h1 onClick={onClick}>todos ♬-{count}</h1>
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
  const { toggleTodo, removeTodo, todos } = props;
  return (
    <ul>
      {todos.map((todo) => (
        <TodoItem
          className="todos"
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          removeTodo={removeTodo}
        ></TodoItem>
      ))}
    </ul>
  );
}

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [count, setCount] = useState(0);

  const onClick = () => {
    setCount(count + 1);
  };

  const addTodo = (todo) => {
    console.log("addTodo");
    setTodos((todos) => [...todos, todo]);
  };

  const removeTodo = (id) => {
    console.log("removeTodo");
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const toggleTodo = (id) => {
    console.log("toggleTodo");
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              complete: !todo.complete
            }
          : todo
      )
    );
  };
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LS_KEY));
    setTodos(todos);
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(todos || "[]"));
  }, [todos]);

  return (
    <div className="todo-list">
      <button>{count}</button>
      <Control onClick={onClick} count={count} addTodo={addTodo} />
      <Todos todos={todos} removeTodo={removeTodo} toggleTodo={toggleTodo} />
    </div>
  );
}

export default TodoList;
