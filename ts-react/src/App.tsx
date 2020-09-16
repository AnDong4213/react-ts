import React, { useState } from "react";
// import logo from "./logo.svg";
import "./App.css";
import Hello from "./components/Hello";
import LikeButton from "./components/LikeButton";
import MouseTracker from "./components/MouseTracker";
import useMousePosition from "./hooks/useMousePosition";
import HOC from "./hoc/index";

function App() {
  const [show, setShow] = useState(true);
  const positions = useMousePosition();

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" /> */}
        {/* <Hello message="Hello World 2" /> */}
        <HOC num={8} />
        {/* <LikeButton /> */}
        <p>
          <button
            onClick={() => {
              setShow(!show);
            }}
          >
            Toggle Tracker
          </button>
        </p>
        {/* <p>
          X: {positions.x}, Y: {positions.y}
        </p> */}
        {/* {show && <MouseTracker />} */}
      </header>
    </div>
  );
}

export default App;
