import React, { useState, useEffect } from "react";

let id = 0;

function Hook(props, state) {
  // const [count, setCount] = useState(0);
  const [count, setCount] = useState(() => {
    console.log(props, state);
    return 0;
  });
  const [name, setName] = useState("an");

  id += 1;

  if (id > 1) {
    console.log(99);
  }
  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <button type="button" onClick={() => setCount(count + 1)}>
      Click ({count}) <br />({name})
    </button>
  );
}

export default Hook;
