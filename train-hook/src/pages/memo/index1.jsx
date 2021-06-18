import React, { Component, PureComponent } from "react";

class Foo extends PureComponent {
  // shouldComponentUpdate(nextProps, nextstate) {
  //   if (nextProps.name === this.props.name) {
  //     return false;
  //   }
  //   return true;
  // }
  render() {
    console.log("Foo Render");
    console.log(this.props);
    return null;
  }
}

/* class App extends Component {
  state = {
    count: 0
  };
  cb = () => {};

  render() {
    const { count } = this.state;
    return (
      <div>
        <button onClick={() => this.setState({ count: count + 1 })}>
          Click-{count}
        </button>
        <Foo name="Mike" cb={this.cb} />
      </div>
    );
  }
} */

class ListOfWords extends React.PureComponent {
  render() {
    return <div>{this.props.words.join(",")}</div>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      words: ["marklar"]
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    // 这部分代码很糟，而且还有 bug
    const words = this.state.words;
    words.push("marklar");
    console.log("words", words);
    this.setState({ words: words.slice() });

    // this.setState((state) => {
    //   return {
    //     words: state.words.concat(["marklar"])
    //   };
    // });
  };

  render() {
    return (
      <div>
        <button onClick={this.handleClick}>看看</button>
        <ListOfWords words={this.state.words} />
      </div>
    );
  }
}

export default App;
