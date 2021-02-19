export default function WrapParent(props) {
  console.log(props);
  // return <div className="parent" children={props.children} />;
  return (
    <div className="parent">
      <i>ll</i>
      {props.children}
    </div>
  );
}
