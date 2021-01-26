import React, {
  PureComponent,
  useState,
  useEffect,
  useContext,
  useMemo,
  memo,
  useCallback,
  useRef
} from "react";

import "./index.css";

function Control() {
  return <div></div>;
}

function Todos() {
  return <div></div>;
}

function TodoList() {
  return (
    <div className="todo-list">
      <Control />
      <Todos />
    </div>
  );
}

export default TodoList;
