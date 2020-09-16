import React from "react";
import './index.css'

import A from './components/A'
import B from './components/B'
import C from './components/C'

class App2 extends React.Component {

  componentDidMount() {
    console.log("componentDidMount");
  }

  render() {
    return (<div className='app'>
      <A/>
      <B/>
      <C/>
    </div>);
  }
}

export default App2;
