import { useEffect } from "react";

export default function WrapParent(props) {
  console.log("parent--props", props);

  useEffect(() => {
    console.log("Wrap--Parent");
  });
  // return <div className="parent" children={props.children} />;
  return (
    <div className="parent">
      <em>我是父组件的</em>
      {props.children}
    </div>
  );
}
