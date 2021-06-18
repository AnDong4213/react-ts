import React from "react";

import { BatteryContext, OnlineContext } from "./context.js";

// 由于Consumer特性，里面的jsx必须是函数的返回值
/* class Leaf extends React.Component {
  render() {
    return (
      <BatteryContext.Consumer>
        {(battery) => (
          <OnlineContext.Consumer>
            {(online) => (
              <div>
                <p>Battery: {battery}</p>
                <p>Online: {String(online)}</p>
              </div>
            )}
          </OnlineContext.Consumer>
        )}
      </BatteryContext.Consumer>
    );
  }
} */
function Leaf() {
  console.log(909);
  return (
    <BatteryContext.Consumer>
      {(battery) => (
        <OnlineContext.Consumer>
          {(online) => (
            <div>
              <p>Battery: {JSON.stringify(battery)}</p>
              <p>Online: {String(online)}</p>
            </div>
          )}
        </OnlineContext.Consumer>
      )}
    </BatteryContext.Consumer>
  );
}

/* class Leaf extends Component {
  static contextType = BatteryContext;  // 类静态变量

  render() {
    const { context } = this;
    console.log("this", this);
    return (
      <div>
        <h4>{context}</h4>
        <input readOnly value={context} />
      </div>
    );
  }
} */

export default Leaf;
