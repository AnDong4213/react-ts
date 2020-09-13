import React from "react";

interface IHelloProps {
  message?: string;
}

/* const Hello = (props: IHelloProps) => {
  return <h2>{props.message}</h2>;
}; */
/* const Hello: React.FunctionComponent<IHelloProps> = (props) => {
  return <h2>{props.message}</h2>;
}; */
const Hello: React.FC<IHelloProps> = (props) => {
  return <h2>{props.message}</h2>;
};

// 不是FunctionComponent的话，不校验类型
Hello.defaultProps = {
  message: "KU"
};

export default Hello;
