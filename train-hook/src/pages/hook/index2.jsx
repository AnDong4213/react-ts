import React, { useState, useEffect, useRef, useCallback } from "react";
// memo针对的是组件的渲染是否重复执行而useMemo则定义了一段函数逻辑是否重复执行，都是利用同样的算法来判定依赖是否发生改变，决定是否触发特定逻辑，仅仅用来做性能优化用
// memo函数根据属性来决定是否重新渲染组件，useMemo可以根据指定的依赖来决定一段函数逻辑是否重新执行，从而优化性能
// ref 获取子组件或者dom元素的句柄  渲染周期之间共享数据的存储

// 自定义hook  似乎和函数组件没什么区别  应该就是输入输出的区别
function useCount(defaultCount) {
  const [count, setCount] = useState(defaultCount);
  let it = useRef();

  useEffect(() => {
    it.current = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);

    return () => {
      clearInterval(it.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (count >= 10) {
      clearInterval(it.current);
    }
  });

  return [count, setCount];
}

/* class Counter extends PureComponent {
  render() {
    const { props } = this;
    return (
      <div>
        <h3 style={{ color: "red" }}>{props.count}</h3>
      </div>
    );
  }
} */

function useCounter(count) {
  const size = useSize();
  return (
    <div>
      <h3 style={{ color: "red" }}>{count}</h3>
      <h1>
        {size.width}X{size.height}
      </h1>
    </div>
  );
}

function useSize() {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  });

  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize, false);

    return () => {
      console.log(9090);
      window.removeEventListener("resize", onResize, false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return size;
}

function Hook(props, state) {
  const [count, setCount] = useCount(0);
  const Counter = useCounter(count);
  const size = useSize();
  /* let it = useRef();

  useEffect(() => {
    it.current = setInterval(() => {
      setCount((count) => count + 1);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (count > 9) {
      clearInterval(it.current);
    }
  }); */

  return (
    <div>
      <button type="button" onClick={() => setCount(count + 1)}>
        Click ({count})
      </button>
      <p>
        {size.width}X{size.height}
      </p>
      <br />
      {/* <Counter count={count} /> */}
      {Counter}
    </div>
  );
}

export default Hook;
