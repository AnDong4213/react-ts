import { useEffect, useState } from "react";
// import { useMount } from "utils";

// javaScript中的函数会形成了闭包。 闭包是由函数以及声明该函数的词法环境组合而成的。该环境包含了这个闭包创建时作用域内的任何局部变量。
const test = () => {
  let num = 0;

  const effect = () => {
    num += 1;
    const message = `现在的num值：${num}`;

    return function unmount() {
      console.log(message);
    };
  };

  return effect;
};
const add = test();
const unmount = add();

add();
add();
add();
add()(); // 积累了前5个 5
unmount(); //  const unmount = add();就这一个   1
test()()(); // 它们共享相同的函数定义，但是保存了不同的词法环境。  1
console.log(this);

// react hook 与 闭包
export const Test = () => {
  /* const [num, setNum] = useState(0);

  const add = () => setNum(num + 1);
  // let it = useRef()

  useEffect(() => {
    const id = setInterval(() => {
      console.log("阿嘎哈", num);
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [num]);

  useEffect(() => {
    return () => {
      console.log(num);
    };
  }, [num]); */

  return (
    <div>
      {/* <button onClick={add}>add</button>
      <p>number: {num}</p> */}
    </div>
  );
};
