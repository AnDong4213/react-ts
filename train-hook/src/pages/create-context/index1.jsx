// 如果你只是想避免层层传递一些属性，组件组合（component composition）有时候是一个比 context 更好的解决方案。
// 有些组件无法提前知晓它们子组件的具体内容。 建议这些组件使用一个特殊的 children prop 来将他们的子组件传递到渲染结果中：

import React from "react";

/* function FancyBorder(props) {
  return (
    <div className={`FancyBorder FancyBorder-${props.color}`}>
      {props.ele}
      {props.children}
      <h3>哈哈哈</h3>
    </div>
  );
}

function WelcomeDialog() {
  return (
    <FancyBorder color="blue" ele={<h1 className="Dialog-title">Welcome</h1>}>
      <p className="Dialog-message">Thank you for visiting our spacecraft!</p>
    </FancyBorder>
  );
} */

function FancyBorder(props) {
  console.log("props", props);
  return (
    <div className={`FancyBorder FancyBorder-${props.color}`}>
      {props.children}
      <h3>哈哈哈</h3>
      {props.content}
    </div>
  );
}
function Dialog(props) {
  return (
    <FancyBorder color="blue" content={props.content}>
      <h1 className="Dialog-title">{props.title} </h1>
      <p className="Dialog-message">{props.message} </p>
    </FancyBorder>
  );
}
function WelcomeDialog(props) {
  const { text } = props;
  const content = <Feed text={text} />;
  return (
    <Dialog
      content={content}
      title="Welcome"
      message="Thank you for visiting our spacecraft!"
    />
  );
}

function WelcomeDialogP() {
  return (
    <div>
      <WelcomeDialog text="我是测试的" />
    </div>
  );
}

function Feed({ text }) {
  return <h4>{text}</h4>;
}
export default WelcomeDialogP;
