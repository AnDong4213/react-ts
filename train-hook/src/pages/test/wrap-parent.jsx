import { useEffect } from "react";

export default function WrapParent(props) {
  useEffect(() => {
    console.log("Wrap--Parent");
  }, []);

  console.log("parent--props", props);
  // return <div className="parent" children={props.children} />;
  return (
    <div className="parent">
      <em>我是父组件的</em>
      {props.children}
    </div>
  );
}
