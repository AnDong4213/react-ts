import React from "react";

type StateType = {
  num: number;
};
type PropType = {
  num: number;
  age: string;
};
interface App {
  state: StateType;
  props: PropType;
}

/* interface IProps {
  num: number;
  age: string;
}
interface IState {
  num: number;
} */

// 两种类型约束方式
// class App extends React.Component<IProps, IState> {
class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      num: 233242
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  render() {
    // console.log(this.props);
    return (
      <div className="App">
        <h1>{this.state.num}</h1>
      </div>
    );
  }
}

export default App;
