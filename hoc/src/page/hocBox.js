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

    render() {
      console.log("App.js传来的props", this.props);
      return (
        <WrappedComponent
          _alert={this._alert}
          _renderContent={this._renderContent}
          data={this.state.data}
          {...this.props}
        />
      );
    }
  };
};

export default withStorage;
