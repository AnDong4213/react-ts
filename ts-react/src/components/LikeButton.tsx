import React, { useState, useEffect } from "react";
import useMousePosition from "./../hooks/useMousePosition";

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
  const [on, setOn] = useState(true);
  const positions = useMousePosition();

  useEffect(() => {
    console.log("document running");
    document.title = `点击了${like}次`;
  }, [like]);

  return (
    <>
      <h1>
        X: {positions.x}, Y: {positions.y}
      </h1>
      <button
        onClick={() => {
          setLike(like + 1);
        }}
      >
        {like} 赞
      </button>
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
