import { useEffect, useRef, useState, useCallback } from "react";

function Example() {
  const [count, setCount] = useState(0);
  const countnow = useRef(null);

  function handleAlertClick() {
    setTimeout(() => {
      console.log(count, countnow.current);
    }, 100);
  }

  const testRef = useCallback((node) => {
    if (node) {
      console.log("node", node.className);
      console.log("node", node.getBoundingClientRect());
    }
  }, []);
  const testRef2 = useRef(null);

  useEffect(() => {
    console.log(testRef2.current);
    countnow.current = count;
  }, [count]);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button ref={testRef2} onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <button ref={testRef} className="tt" onClick={handleAlertClick}>
        Show alert
      </button>
      {/* <MeasureExample ref={testRef} /> Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?  */}
    </div>
  );
}

/* function MeasureExample() {
  const [height, setHeight] = useState(0);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      console.log(node.className);
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);

  return (
    <>
      <h1 className="yy" ref={measuredRef}>
        Hello, world
      </h1>{" "}
      <h2>The above header is {Math.round(height)}px tall</h2>
    </>
  );
} */

/* function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      console.log(909);
      setCount(count + 1); // 这个 effect 依赖于 `count` state
    }, 1000);
    return () => {
      console.log("删除");
      clearInterval(id);
    };
  }, []); // 🔴 Bug: `count` 没有被指定为依赖

  return <h1>{count}</h1>;
} */

/* function Counter() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(0);
  }, []);
  useEffect(() => {
    const id = setInterval(() => {
      console.log(909);
      setCount((c) => c + 1); // ✅ 在这不依赖于外部的 `count` 变量
    }, 1000);
    return () => clearInterval(id);
  }, []); // ✅ 我们的 effect 不适用组件作用域中的任何变量

  return <h1>{count}</h1>;
}
 */
function App1() {
  const cbRef = useRef(() => alert("init"));
  const cb = cbRef.current;
  console.log(cb);

  return (
    <div>
      <button onClick={() => (cbRef.current = () => alert("update"))}>
        应用
      </button>
      <button onClick={cb()}>乐乐1-1</button> 直接运行函数
      {/* <button onClick={cb.current()}>乐乐1</button>  报错  TypeError: cb.current is not a function */}
      <button onClick={cb.current}>乐乐1</button>
      <button onClick={() => cbRef.current()}>乐乐2</button>
    </div>
  );
}
export default Example;
