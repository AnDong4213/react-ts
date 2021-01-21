import React, {
  Component,
  useState,
  useEffect,
  useContext,
  useMemo,
  memo,
  useCallback
} from "react";
import { CountContext, ParentContext } from "./context";
// memo针对的是组件的渲染是否重复执行而useMemo则定义了一段函数逻辑是否重复执行，都是利用同样的算法来判定依赖是否发生改变，决定是否触发特定逻辑，仅仅用来做性能优化用

function Hook(props, state) {
  // const [count, setCount] = useState(0);
  const [count, setCount] = useState(() => {
    console.log(props, state);
    return 0;
  });
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight
  });

  useEffect(() => {
    // console.log("count:", count);
  }, [count]);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  const onResize = () => {
    setSize({
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight
    });
  };

  // 关注点分离，不同的事情分开放，提高了代码复用，优化了关注点分离
  useEffect(() => {
    window.addEventListener("resize", onResize, false);

    // 回调函数在视图被销毁之前触发，有两种销毁的原因，一是重渲染，二是组件卸载。useEffect每次渲染后都运行，难道要不停的绑定和解绑事件吗，不需要，给useEffect多传递一个空数组参数，就可避免
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);
  // []只有数组的每一项都不变的情况下，useEffect才不会执行

  const onClick2 = (e) => {
    console.log(e);
  };
  useEffect(() => {
    document.querySelector("#size").addEventListener("click", onClick2, false);
    return () => {
      // console.log(document.querySelector("#size"));
      document.querySelector("#size") &&
        document.querySelector("#size").removeEventListener("click", onClick2);
    };
  });

  const double = useMemo(() => {
    return count * 2;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count === 3]);

  // 如果这样写，即使double没有变化，每次app重渲染后(onClick每次返回了新句柄)，onClick句柄的变化导致了Counter2也被连带重新渲染
  // onClick就不应该经常变化了，毕竟只是一个函数而已，尽量让onClick的句柄不发生变化
  /* const onClick = () => {
    console.log(99);
  }; */

  // 用useMemo进行优化
  /* const onClick = useMemo(() => {
    return () => {
      console.log(99);
    };
  }, []); */

  // 用useCallback进行优化，如果useMemo返回的是一个函数，可以直接用useCallback来省略顶层的函数，useMemo的一个变体
  // useMemo(() => fn) --> useCallback(fn)
  const onClick = useCallback(() => {
    console.log(99);
  }, []);
  console.log("onClick", onClick);

  return (
    <div>
      <button type="button" onClick={() => setCount(count + 1)}>
        Click ({count})
      </button>
      <br />
      {count % 2 ? (
        <span id="size">span-Size: ({JSON.stringify(size)})</span>
      ) : (
        <p id="size">p-Size: ({JSON.stringify(size)})</p>
      )}
      <ParentContext.Provider value={count + 10}>
        <CountContext.Provider value={count}>
          <Bar />
          <Counter />
        </CountContext.Provider>
      </ParentContext.Provider>
      <p>-----------------------------------------------------------</p>
      <Counter2 count={double} onClick={onClick} />
      <p>double: {double}</p>
    </div>
  );
}

class Bar extends Component {
  static contextType = CountContext;

  render() {
    const count = this.context;
    return <h3>{count}</h3>;
  }
}

function Counter() {
  const count = useContext(CountContext);
  const parcount = useContext(ParentContext);
  return (
    <div>
      <h3>{count}</h3>
      <h3>{parcount}</h3>
    </div>
  );
}

/* function Counter2(prpos) {
  console.log("Counter render");
  return (
    <div>
      <h3>{prpos.count}</h3>
    </div>
  );
} */

const Counter2 = memo((props) => {
  console.log("Counter render");
  return (
    <div>
      <h3 onClick={props.onClick}>{props.count}</h3>
    </div>
  );
});

export default Hook;
