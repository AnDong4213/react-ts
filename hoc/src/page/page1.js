import React, { Component } from "react";
import HocBox from "./hocBox";

class Page1 extends Component {
  render() {
    console.log("this.props", this.props);
    return (
      <>
        <h2>{this.props.data}</h2>
        <div>这是组件Page1自己的内容</div>
        {this.props._renderContent()}
        <div>
          <button
            onClick={() => {
              this.props._alert("看看");
            }}
          >
            点击事件
          </button>
        </div>
      </>
    );
  }
}

export default HocBox(Page1); //这是把组件传入高阶组件
