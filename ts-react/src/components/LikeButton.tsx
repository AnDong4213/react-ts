import React, { useState, useEffect, useRef, useContext } from "react";
import useMousePosition from "./../hooks/useMousePosition";
import { ThemeContext } from "../App";

/* const LikeButton: React.FC = () => {
  const [like, setLike] = useState(0);
  return (
    <button
      onClick={() => {
        setLike(like + 1);
      }}
    >
      {like} 赞
    </button>
  );
}; */

/* const LikeButton: React.FC = () => {
  const [obj, setObj] = useState({ like: 0, on: true });
  return (
    <>
      <button
        onClick={() => {
          setObj({ like: obj.like + 1, on: true });
        }}
      >
        {obj.like} 赞
      </button>
      <button
        onClick={() => {
          setObj({ like: obj.like, on: !obj.on });
        }}
      >
        {obj.on ? "ON" : "OFF"}
      </button>
    </>
  );
}; */

const LikeButton: React.FC = () => {
  const [like, setLike] = useState(0);
  const likeRef = useRef(0);
  const didMountRef = useRef(false);
  const domRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState("");
  const theme = useContext(ThemeContext);
  const style = {
    color: theme.color,
    background: theme.background
  };

  const [on, setOn] = useState(true);
  // const positions = useMousePosition();

  useEffect(() => {
    console.log("document running");
    document.title = `点击了${like}次`;
  }, [like]);
  useEffect(() => {
    if (didMountRef.current) {
      console.log("this is update");
    } else {
      didMountRef.current = true;
    }
  });
  useEffect(() => {
    if (domRef && domRef.current) {
      domRef.current.focus();
      console.log(domRef.current.value);
    }
  });

  function handleAlertClick() {
    setTimeout(() => {
      alert(`you click on -- ${likeRef.current}`);
    }, 3000);
  }
  function onChangeInput(e: any) {
    console.log(e.target.value);
    setInputValue(e.target.value);
  }

  return (
    <>
      <input
        type="text"
        ref={domRef}
        onChange={(e) => onChangeInput(e)}
        value={inputValue}
      />
      {/* <h1>
        X: {positions.x}, Y: {positions.y}
      </h1> */}
      <button
        style={style}
        onClick={() => {
          setLike(like + 1);
          likeRef.current++;
        }}
      >
        {like} 赞
      </button>
      <br />
      <button onClick={handleAlertClick}>Alert!</button>
      <br />
      <button
        onClick={() => {
          setOn(!on);
        }}
      >
        {on ? "ON" : "OFF"}
      </button>
    </>
  );
};

export default LikeButton;
