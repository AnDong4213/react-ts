import { useState, useEffect } from "react";
import axios from "axios";

/* function Example() {
  const [count, setCount] = useState(0);
  const aa = useRef();
  aa.current = count;

  function handleAlertClick() {
    setTimeout(() => {
      alert("You clicked on: " + aa.current);
    }, 2000);
  }

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
      <button onClick={handleAlertClick}>Show alert</button>
    </div>
  );
} */

/* function MeasureExample() {
  const [height, setHeight] = useState(0);
  const [height2, setHeight2] = useState(0);

  const measuredRef = useCallback((node) => {
    if (node !== null) {
      console.log("node", node.innerText);
      setHeight(node.getBoundingClientRect().height);
    }
  }, []);
  return (
    <>
      <h1 ref={measuredRef}>Hello, world</h1>
      <h2>The above header is {Math.round(height)}px tall</h2>
      <h3 onClick={() => setHeight2(height2 + 1)}>{height2}</h3>
    </>
  );
} */

/* function MeasureExample() {
  const [rect, ref] = useClientRect();
  return (
    <>
      <h2 ref={ref}>Hello, world</h2>
      {rect !== null && (
        <h2>The above header is {Math.round(rect.height)}px tall</h2>
      )}
    </>
  );
}

function useClientRect() {
  const [rect, setRect] = useState(null);
  const ref = useCallback((node) => {
    if (node !== null) {
      setRect(node.getBoundingClientRect());
    }
  }, []);
  return [rect, ref];
} */

function SearchResults() {
  const [data, setData] = useState({ hits: [] });
  const [query, setQuery] = useState("react");

  useEffect(() => {
    let ignore = false;

    async function fetchData() {
      const result = await axios(
        "https://hn.algolia.com/api/v1/search?query=" + query
      );
      if (!ignore) setData(result.data);
    }

    fetchData();
    return () => {
      ignore = true;
    };
  }, [query]);

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <ul>
        {data.hits.map((item) => (
          <li key={item.objectID}>
            <a href={item.url}>{item.title}</a>
          </li>
        ))}
      </ul>
    </>
  );
}

export default SearchResults;
