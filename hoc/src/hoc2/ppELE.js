import React, { Component } from "react";
import ppHOC from "./ppHOC";

// 修饰器语法
@ppHOC
class Example extends Component {
  render() {
    return <input value="pp" name="name" {...this.props.name} />;
  }
}
export default Example;

// export default ppHOC(Example);
