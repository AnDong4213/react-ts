import { useEffect, useState } from "react";
import { useDebounce } from "../../utils";

export default function WrapChild() {
  // console.log("child--props");
  const [text, setText] = useState("");
  const debounceParam = useDebounce(text, 2000);

  useEffect(() => {
    console.log("Wrap--Child", debounceParam);
  }, [debounceParam]);
  return (
    <div>
      <h1>Wrap--Child--{text || "init"}</h1>
      <input
        onInput={(e) => {
          setText(e.target.value);
        }}
      />
    </div>
  );
}
