import React, { Component } from "react";
import HocBox from "./hocBox";

class Page1 extends Component {
  method() {
    console.log("this.props", this.props);
  }
  render() {
    return (
      <>
        <h2>{this.props.data}</h2>
        <div>
          <i style={{ color: "orange" }}>这是组件Page1自己的内容</i>
        </div>
        {this.props._renderContent()}
        <div>
          <button
            onClick={() => {
              this.props._alert("看看");
            }}
          >
            点击事件
          </button>
          <p>
            -------------------------------------------------------------------
          </p>
        </div>
      </>
    );
  }
}

export default HocBox(Page1); //这是把组件传入高阶组件
