import React, { Component } from "react";
import Middle from "./middle.jsx";

import { BatteryContext, OnlineContext } from "./context.js";

class CreateContext extends Component {
  state = {
    battery: 60,
    online: false
  };

  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, prevState);
  }

  render() {
    const { battery, online } = this.state;
    return (
      <BatteryContext.Provider value={battery}>
        <OnlineContext.Provider value={online}>
          <button
            type="button"
            onClick={() => this.setState({ battery: battery - 1 })}
          >
            press
          </button>
          <button
            type="button"
            onClick={() => this.setState({ online: !online })}
          >
            switch
          </button>
          <Middle />
        </OnlineContext.Provider>
      </BatteryContext.Provider>
    );
  }
}
export default CreateContext;
