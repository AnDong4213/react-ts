import React, { Component } from "react";
import ppHOC from "./ppHOC";

// 修饰器语法
@ppHOC
class Example extends Component {
  render() {
    return (
      <div>
        <span>{this.props.name}</span>
        <h4>{JSON.stringify(this.props.name1)}</h4>
      </div>
    );
  }
}
export default Example;

// export default ppHOC(Example);
