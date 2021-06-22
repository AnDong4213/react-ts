import React, {
  useState,
  useMemo,
  memo,
  useCallback,
  useEffect,
  useRef,
  PureComponent
} from "react";

const Counter = memo((props) => {
  console.log("Counter render");
  const prev = useRef(props.onClick);
  console.log("prev", prev.current === props.onClick);
  return (
    <div>
      <h3 onClick={props.onClick} style={{ color: "red" }}>
        {props.count}
      </h3>
    </div>
  );
});

class Counter2 extends PureComponent {
  state = {
    overflow: false
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("nextProps", nextProps);
    console.log("prevState", prevState);
    if (nextProps.count > 10) {
      console.log(988);
      return {
        overflow: true
      };
    }
    return null;
  }
  render() {
    const { props } = this;
    return (
      <div>
        <h3 onClick={props.onClick} style={{ color: "blue" }}>
          {props.count}--{String(this.state.overflow)}
        </h3>
      </div>
    );
  }
}

function Hook() {
  const [count, setCount] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const counterRef = useRef();

  useEffect(() => {
    // console.log(90)
    console.log("counterRef.current", counterRef.current);
  });

  const double = useMemo(() => {
    return count * 2;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count === 3]);

  /* const onClick = () => {
    console.log(999999);
  }; */
  //这样写句柄会发生变化，组件会重新渲染
  /* const onClick = useCallback(() => {
    console.log(999999);
    setClickCount(clickCount + 1);
  }, [clickCount]); */
  const onClick = useCallback(() => {
    setClickCount((clickCount) => {
      return clickCount + 1;
    });
    console.log(counterRef.current);
  }, []);

  return (
    <div>
      <button type="button" onClick={() => setCount(count + 1)}>
        Click ({count})
      </button>
      <br />
      <em>{clickCount}</em>
      <br />
      <Counter count={double} onClick={onClick} />
      <Counter2 ref={counterRef} count={count} onClick={onClick} />
    </div>
  );
}

export default Hook;
