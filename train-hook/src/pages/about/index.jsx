import { useEffect, useState, useMemo } from "react";

const About = () => {
  const [count, setCount] = useState(0); // 加了这一行
  // const value = { name: 1 };
  const value = useMemo(() => ({ name: 1 }), []);

  useEffect(() => {
    setCount(Math.random());
    console.log("render");
  }, [value]);

  return (
    <div className="App">
      <h1>Hello CodeSandbox{count}</h1>
      <h2>Edit to see some magic happen!</h2>
    </div>
  );
};

export default About;
