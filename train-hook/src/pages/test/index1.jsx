// eslint-disable-next-line no-unused-vars
import React, { Component, PureComponent, useEffect, useState } from "react";
// import ReactPlayer from "react-player";
import WrapParent from "./wrap-parent";
import WrapChild from "./wrap-child";

/* class Child extends PureComponent {
  render() {
    console.log(9900);
    return (
      <div>
        <h1>99</h1>
      </div>
    );
  }
} */

/* class Test extends Component {
  state = {
    count: 1
  };
  render() {
    const { count } = this.state;
    return (
      <div>
        <h1 onClick={() => this.setState({ count: count + 1 })}>Test</h1>
        <p>{count}</p>
        <Child />
      </div>
    );
  }
} */

function Test2() {
  const [count, setCount] = useState(1);

  return (
    <div>
      <h1 onClick={() => setCount((count) => count + 1)}>Test</h1>
      <p style={{ color: "red" }}>{count}</p>
      {/* <ReactPlayer
        playing={false}
        loop={true}
        controls={true}
        muted={true}
        url="https://huitun.com/icon/home/video_bg.mp4"
      /> */}
      <Child2 count={count} />
      <WrapParent>
        <WrapChild />
      </WrapParent>
    </div>
  );
}

function Child2(props) {
  const { count } = props;
  useEffect(() => {
    console.log(1111111);
  }, [count]);
  console.log("props", props);
  return (
    <div>
      <h1 style={{ color: "pink" }}>{count}</h1>
    </div>
  );
}

export default Test2;
