import React from "react";

const withStorage = (WrappedComponent) => {
  return class extends React.Component {
    state = { data: null };
    componentDidMount() {
      let data = "这是hoc的data";
      this.setState({ data });
    }

    _renderContent = () => {
      return <div>这是 hoc 的content 内容</div>;
    };

    _alert = (tip) => {
      alert(tip);
    };

    // 通过 refs 获取组件实例
    proc(wrappedComponentInstance) {
      if (wrappedComponentInstance) {
        wrappedComponentInstance.method();
      }
    }

    render() {
      console.log("App.js传来的props", this.props);
      const newProps = {
        user: "currentLoggedInUser"
      };
      const props = Object.assign({}, this.props, {
        ref: this.proc.bind(this)
      });
      return (
        <WrappedComponent
          _alert={this._alert}
          _renderContent={this._renderContent}
          data={this.state.data}
          {...props}
          {...newProps}
        />
      );
    }
  };
};

export default withStorage;
