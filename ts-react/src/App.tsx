import React from "react";
// import logo from "./logo.svg";
import "./App.css";
import Hello from "./components/Hello";
import LikeButton from "./components/LikeButton";
import MouseTracker from "./components/MouseTracker";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" /> */}
        {/* <Hello message="Hello World 2" /> */}
        {/* <LikeButton /> */}
        <MouseTracker />
      </header>
    </div>
  );
}

export default App;
