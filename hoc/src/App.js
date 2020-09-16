import React from "react";
import "./App.css";

// import HOC from './hoc/index.js'
import HOC2 from "./hoc2/index.js";
import Page1 from "./page/page1"; //也可以引入page2
import ReverseInput from "./prototype/reverseInput";

/* function App() {
  return (
    <div className="App">
      <HOC2 name="HOC2" age={19} />
      <Page1 />
    </div>
  );
} */

class App extends React.Component {
  state = {
    name: "安东"
  };

  render() {
    const { name } = this.state;
    return (
      <div className="App">
        <HOC2 name={name} age={25} />
        {/* <Page1 name={name} /> */}
        <ReverseInput name={name} />
      </div>
    );
  }
}

export default App;
