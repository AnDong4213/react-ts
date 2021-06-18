import React, { Component } from "react";
import Middle from "./middle.jsx";

import { BatteryContext, OnlineContext } from "./context.js";

class CreateContext extends Component {
  state = {
    battery: 60,
    online: false,
    obj: { something: "something" },
    uu: 9
  };

  componentDidUpdate(prevProps, prevState) {
    // console.log(prevProps, prevState);
  }

  render() {
    const { battery, online, uu } = this.state;
    return (
      <div>
        <h3 onClick={() => this.setState({ uu: uu + 1 })}>React--{uu}</h3>
        <BatteryContext.Provider value={this.state.obj}>
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
      </div>
    );
  }
}
export default CreateContext;
