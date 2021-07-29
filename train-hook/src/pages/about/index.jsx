import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";

/* function withWindowWidth(BaseComponent) {
  class DerivedClass extends React.Component {
    state = {
      windowWidth: window.innerWidth,
      haha: "99"
    };

    onResize = () => {
      this.setState({
        windowWidth: window.innerWidth
      });
    };

    componentDidMount() {
      console.log(this.props); // {hehe: "6666"}
      window.addEventListener("resize", this.onResize);
    }

    componentWillUnmount() {
      window.removeEventListener("resize", this.onResize);
    }

    render() {
      return <BaseComponent {...this.props} {...this.state} />;
    }
  }
  return DerivedClass;
}

const MyComponent = (props) => {
  console.log(props); // {hehe: "6666", windowWidth: 967, haha: "99"}
  return <div>Window width is: {props.windowWidth}</div>;
};

function withPar() {
  const Ab = withWindowWidth(MyComponent);
  return <Ab hehe="6666" />;
}
export default withPar; */

/* class WindowWidth extends React.Component {
  // static propTypes = {
  //   children: PropTypes.func.isRequired
  // };

  state = {
    windowWidth: window.innerWidth,
    haha: "哈哈哈"
  };

  onResize = () => {
    this.setState({
      windowWidth: window.innerWidth
    });
  };
  componentDidMount() {
    console.log(this.props);
    window.addEventListener("resize", this.onResize);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize);
  }

  render() {
    return this.props.children({
      width: this.state.windowWidth,
      haha: this.state.haha
    });
  }
}
WindowWidth.propTypes = {
  children: PropTypes.func.isRequired
};

const Root =
  () =>
  ({ width, haha }) =>
    (
      <div>
        Window width is: {width}-{haha}
      </div>
    );

const MyComponent = () => {
  return <WindowWidth>{Root()}</WindowWidth>;
};

export default MyComponent; */

/* const MyComponent = () => {
  return (
    <WindowWidth>
      {({ width, haha }) => (
        <div>
          Window width is: {width}-{haha}
        </div>
      )}
    </WindowWidth>
  );
}; */

class Cat extends React.Component {
  render() {
    const { mouse } = this.props;
    return (
      <img
        src="https://cdn2.thecatapi.com/images/WW845Q1wW.jpg"
        style={{
          position: "absolute",
          left: mouse.x,
          top: mouse.y,
          width: "200px"
        }}
        alt="render prop"
      />
    );
  }
}

class Mouse extends React.Component {
  constructor(props) {
    super(props);
    // this.handleMouseMove = this.handleMouseMove.bind(this);
    this.state = { x: 0, y: 0 };
  }

  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  };
  /* handleMouseMove(event) {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  } */

  render() {
    return (
      <div style={{ height: "100vh" }} onMouseMove={this.handleMouseMove}>
        {/*
          Instead of providing a static representation of what <Mouse> renders,
          use the `render` prop to dynamically determine what to render.
        */}
        {/* {this.props.render(this.state)} */}
        {this.props.children(this.state)}
      </div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>移动鼠标!</h1>
        {/* <Mouse render={(mouse) => <Cat mouse={mouse} />} /> */}
        <Mouse>{(mouse) => <Cat mouse={mouse} />}</Mouse>
      </div>
    );
  }
}

export default MouseTracker;
