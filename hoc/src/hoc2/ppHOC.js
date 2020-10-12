import React, { Component } from "react";

function ppHOC(WrappedComponent) {
  return class PP extends Component {
    constructor(props) {
      super(props);
      this.state = {
        name: ""
      };
      this.onNameChange = this.onNameChange.bind(this);
    }
    onNameChange(event) {
      console.log("event.target.value", event.target.value);
      this.setState({
        name: event.target.value
      });
    }
    render() {
      console.log("this.props--ppppppppp", this.props);
      const newProps = {
        name: {
          value: this.state.name,
          onChange: this.onNameChange
        }
      };
      return <WrappedComponent {...this.props} {...newProps} />;
    }
  };
}

export default ppHOC;
