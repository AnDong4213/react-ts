import React, { Component } from "react";

export default (WrappedComponent) => {
  return class Enhancer extends WrappedComponent {
    componentDidMount() {
      // 可以打印this，看一看，相当于继承了传过来的组件，可以直接操作state，事件等
      console.log("this", this);
      /* this.setState({
        value: "呵呵"
      }); */
    }

    toSubmit = () => {
      alert(this.state.value);
    };

    valueChange = (e) => {
      let value = e.target.value;
      this.setState({
        value
      });
    };

    render() {
      // console.log("this.props44", this.props);
      /* if (this.props.loggedIn) {
        return super.render();
      } else {
        return null;
      } */

      return (
        <div>
          <h1 style={{ color: "red" }}>{this.props.name}</h1>
          <p>Props</p> <pre>{JSON.stringify(this.props, null, 2)}</pre>
          {super.render()}
        </div>
      );

      /* const elementsTree = super.render();
      let newProps = {};
      if (elementsTree && elementsTree.type === "input") {
        newProps = { value: "may the force be with you" };
      }
      const props = Object.assign({}, elementsTree.props, newProps);
      const newElementsTree = React.cloneElement(
        elementsTree,
        props,
        elementsTree.props.children
      );
      return newElementsTree; */
    }
  };
};
