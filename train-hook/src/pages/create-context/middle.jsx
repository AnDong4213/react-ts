import React from "react";
import Leaf from "./leaf.jsx";
import { BatteryContext } from "./context.js";

/* class Middle extends React.Component {
  // static contextType = BatteryContext;

  render() {
    console.log("this", this);
    return (
      <div>
        <h3 style={{ color: "red" }}>{this.context}</h3>
        <Leaf />
      </div>
    );
  }
}
Middle.contextType = BatteryContext; */

// 需要函数作为子元素（function as a child）这种做法
function Middle() {
  return (
    <BatteryContext.Consumer>
      {(context) => (
        <div>
          <h3 style={{ color: "red" }}>{JSON.stringify(context)}</h3>
          <Leaf />
        </div>
      )}
    </BatteryContext.Consumer>
  );
}

export default Middle;
