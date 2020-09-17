import React, { Component } from "react";
import HocReverseIn from "./hocReverseIn";

class ReverseInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "哈哈"
    };
  }
  // 这个 地方可写可不写
  toSubmit = () => {};

  // 处理输入值变化动作。定义了方法没有方法实体
  valueChange = (e) => {};

  render() {
    const { value } = this.state;
    console.log("this.props22", this.props);
    return (
      <div>
        <input onChange={this.valueChange} value={value} />
        <button onClick={this.toSubmit}>提交</button>
        <h1>{value}</h1>
      </div>
    );
  }
}

export default HocReverseIn(ReverseInput);
