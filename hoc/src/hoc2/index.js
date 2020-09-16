import React, { Component } from "react";

const Demo = (props) => {
  return <div>My name is {props.name}</div>;
};

const HOC = (WrapperComponent) => {
  return class Permission extends Component {
    render() {
      // console.log({ ...this.props }); // {name: "看看", age: 19}
      return (
        <div>
          <header>nihao</header>
          <WrapperComponent {...this.props} />
        </div>
      );
    }
  };
};

export default HOC(Demo);
