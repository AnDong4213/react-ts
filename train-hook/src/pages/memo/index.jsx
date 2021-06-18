import React, { Component, memo } from "react";

// PureComponent提供的shouldComponentUpdate发现对象的句柄本身没有变化时，拒绝重新渲染
// 只有传入的props的第一级发生变化，才会重新渲染

// 传入了内联函数cb={() => {}}，每次都是新的，每次会重新渲染
// 传入cb={this.callback}不会重新渲染，如果cb={this.callback.bind(this)}会重新渲染
/* class Foo extends PureComponent {
  // shouldComponentUpdate(nextProps, nextState) {
  //   // console.log("nextProps", nextProps);
  //   // console.log("nextState", nextState);
  //   // console.log("this", this);
  //   if (nextProps.name === this.props.name) {
  //     return false;
  //   }

  //   return true;
  // }

  render() {
    console.log("Foo render");
    return <div>{this.props.person.age}</div>;
  }
} */

/* function Foo(props) {
  console.log("Foo render");
  return <div>{props.person.age}</div>;
} */

const Foo = memo((props) => {
  console.log("Foo render");
  console.log(props);
  return <div>{props.person.age}</div>;
});

class Memo extends Component {
  state = {
    count: 0,
    person: {
      age: 20
    }
  };
  render() {
    const { count, person } = this.state;
    return (
      <div>
        <button onClick={() => this.clickHandle()}>Click</button>
        {count}
        <Foo name="moke" person={person} cb={this.callback} />
      </div>
    );
  }

  // 不可变数据的力量
  clickHandle() {
    const { count, person } = this.state;
    person.age++;

    this.setState({
      count: count + 1,
      person
    });
  }

  // callback() {}  // 类成员函数导致this不正确，不得不使用类属性来声明回调函数
  callback = () => {};
}

export default Memo;
