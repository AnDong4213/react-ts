import React from "react";
import { Test } from "./test";

// 但是我们在某些条件下需要对 JS 控制的区域实现批量更新 ( 异步更新 DOM ) ，那应该怎么做呢？强制批量更新
import { unstable_batchedUpdates } from "react-dom";

class FChild extends React.Component {
  state = {
    count: 0
  };

  componentDidMount() {
    // 在原生 DOM 事件中设置 setState,可以拿到最新的值
    document.querySelector("#nativeBtnId").addEventListener("click", () => {
      this.setState({
        count: this.state.count + 1
      });
      this.setState({
        count: this.state.count + 2
      });
      console.log(this.state.count);
    });
  }

  // setState 是同步还是异步的呀？ 同步和异步主要取决于它被调用的环境。
  // setState传递的状态不论是对象形式还是函数形式，它都会先将所有状态保存起来，然后进行状态合并，所有状态合并完成后再进行一次性 DOM 更新。

  /* 
  1，如果 setState 在 React 能够控制的范围被调用，它就是异步的。
  2，如果 setState 在原生 JavaScript 控制的范围被调用，它就是同步的。

  我们看到的所谓的 “异步”，是开启了 “批量更新” 模式的。

“批量更新” 模式：可以减少真实dom渲染的次数。所以只要是react能够控制的范围，出于性能因素考虑，一定是批量更新模式。批量更新会先合并状态，再一次性的做dom更新 */
  clickHandle = () => {
    //  React 不会更新 `this.state.count`，直到该组件被重新渲染。
    /* this.setState({
      count: this.state.count + 1
    });
    this.setState({
      count: this.state.count + 2
    }); */

    // 在 setTimeout/setInterval 中设置 setState,可以拿到最新的值
    setTimeout(() => {
      // unstable_batchedUpdates(() => {
      this.setState({
        count: this.state.count + 1
      });
      this.setState({
        count: this.state.count + 2
      });
      console.log(this.state.count);
      // });
    });
  };

  // 函数形式
  // 给 setState 传递一个对象与传递一个函数的区别是什么？
  //传递一个函数可以让你在函数内访问到当前的 最新state 的值。因为 setState 的调用是分批的，所以你可以链式地进行更新，并确保它们是一个建立在另一个之上的，这样才不会发生冲突：
  /* clickHandle = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1
    }));
    this.setState((prevState, props) => {
      console.log(props); // {age: 9}

      // const aa = await Promise.resolve(2);
      // console.log(aa);
      return {
        count: prevState.count + 2
      };
    });
    console.log(this.state.count);
  }; */

  componentDidUpdate(props, prevState) {
    // console.log(props, prevState); // {age: 9} {count: 0}
    console.log(this.state.count);
  }

  render() {
    return (
      <div>
        <h4>{this.state.count}</h4>
        <button onClick={this.clickHandle}>点击1</button>
        <button id="nativeBtnId">点击2</button>
      </div>
    );
  }
}

function DataFlow() {
  return (
    <section>
      <div>DataFlow</div>
      <FChild age={9} />
      <Test />
    </section>
  );
}

export default DataFlow;
