import React from "react";
import './index.css'

// import A from './components/A'
import B from './components/B'
import C from './components/C'

type StateType = {
  num: number;
};
type PropType = {
  num: number;
};
interface App {
  state: StateType;
  props: PropType;
}

class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      num: 23
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
  }

  render() {
    return (
      <div className='App'>
        {/* <A /> */}
        <B />
        <C />
      </div>
    );
  }
}

export default App;
