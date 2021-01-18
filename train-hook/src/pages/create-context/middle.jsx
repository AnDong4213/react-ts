import React, { Component } from "react";
import Leaf from "./leaf.jsx";

class Middle extends Component {
  render() {
    return (
      <div>
        <Leaf />
      </div>
    );
  }
}

export default Middle;
