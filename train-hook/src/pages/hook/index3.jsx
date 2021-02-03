import React, { useState, useMemo, memo, useCallback } from "react";

const Counter = memo((props) => {
  console.log("Counter render");
  return (
    <div>
      <h3 onClick={props.onClick} style={{ color: "red" }}>
        {props.count}
      </h3>
    </div>
  );
});

function Hook() {
  const [count, setCount] = useState(0);

  const double = useMemo(() => {
    return count * 2;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count === 3]);

  /* const onClick = () => {
    console.log(999999);
  }; */
  const onClick = useCallback(() => {
    console.log(999999);
  }, []);

  return (
    <div>
      <button type="button" onClick={() => setCount(count + 1)}>
        Click ({count})
      </button>
      <br />
      <Counter count={double} onClick={onClick} />
    </div>
  );
}

export default Hook;
