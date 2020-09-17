import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Hello from "./components/Hello";
import LikeButton from "./components/LikeButton";
import MouseTracker from "./components/MouseTracker";
import useMousePosition from "./hooks/useMousePosition";
import HOC from "./hoc/index";
import withLoader from "./components/withLoader";

import useURLLoader from "./hooks/useURLLoader";

interface IShowResult {
  message: string;
  status: string;
}

const DogShow: React.FC<{
  data: IShowResult;
  age: number;
  isLoading: boolean;
}> = ({ data, age, isLoading }) => {
  return (
    <>
      <h2>
        Dog show: {data.status}; isLoading--{String(isLoading)}; age--{age}
      </h2>
      <img src={data.message} alt="" />
    </>
  );
};

function App() {
  const [show, setShow] = useState(true);
  // const positions = useMousePosition();

  const WrappedDogShow = withLoader(
    DogShow,
    "https://dog.ceo/api/breeds/image/random"
  );

  const [
    data,
    loading
  ] = useURLLoader("https://dog.ceo/api/breeds/image/random", [show]);
  const dogResult = data as IShowResult;

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" /> */}
        {/* <Hello message="Hello World 2" /> */}
        {/* <WrappedDogShow age={252} /> */}
        {loading ? (
          <img className="App-logo" src={logo} alt={String(show)} />
        ) : (
          <img
            className="App-logo"
            src={dogResult && dogResult.message}
            alt={String(!show)}
          />
        )}
        <HOC num={8} age="9" />
        <LikeButton />
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
