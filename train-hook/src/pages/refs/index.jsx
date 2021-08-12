import React, {
  useImperativeHandle,
  forwardRef,
  useRef,
  createRef
} from "react";
import { useEffect } from "react";

/* class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    // 创建一个 ref 来存储 textInput 的 DOM 元素
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // 直接使用原生 API 使 text 输入框获得焦点
    // 注意：我们通过 "current" 来访问 DOM 节点
    this.textInput.current.focus();
    console.log(this.textInput.current);
  }

  render() {
    // 告诉 React 我们想把 <input> ref 关联到
    // 构造器里创建的 `textInput` 上
    return (
      <div>
        <input type="text" ref={this.textInput} />{" "}
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}

class AutoFocusTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount() {
    this.textInput.current.focusTextInput();
    console.log(this.textInput.current);
  }

  render() {
    return <CustomTextInput ref={this.textInput} />;
  }
}

export default AutoFocusTextInput; */

// 回调 Refs
// React 也支持另一种设置 refs 的方式，称为“回调 refs”。它能助你更精细地控制何时 refs 被设置和解除。
// 不同于传递 createRef() 创建的 ref 属性，你会传递一个函数。这个函数中接受 React 组件实例或 HTML DOM 元素作为参数，以使它们能在其他地方被存储和访问。
// 下面的例子描述了一个通用的范例：使用 ref 回调函数，在实例的属性中存储对 DOM 节点的引用。
/* class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);

    this.textInput = null;
    this.setTextInputRef = (element) => {
      console.log(element);
      this.textInput = element;
    };
    this.focusTextInput = () => {
      // 使用原生 DOM API 使 text 输入框获得焦点
      if (this.textInput) this.textInput.focus();
    };
  }

  componentDidMount() {
    // 组件挂载后，让文本框自动获得焦点
    this.focusTextInput();
  }

  render() {
    // 使用 `ref` 的回调函数将 text 输入框 DOM 节点的引用存储到 React
    // 实例上（比如 this.textInput）
    return (
      <div>
        <input type="text" ref={this.setTextInputRef} />
        <input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}
export default CustomTextInput; */

/* class ForwardRef extends React.Component {
  constructor() {
    super();
    this.sss = createRef();
  }
  componentDidMount() {
    console.log(this.sss.current);
    this.sss.current.setAttribute("id", "qqq");
  }

  render() {
    return (
      <div>
        <FancyButton age={99} ref={this.sss}>
          Click me!2
        </FancyButton>
      </div>
    );
  }
} */

/* const FancyButton = React.forwardRef((props, ref) => {
  console.log(props);
  return (
    <button ref={ref} className="FancyButton">
      {props.children}
    </button>
  );
});

function ForwardRef2() {
  const sss = useRef();

  useEffect(() => {
    console.log(sss.current);
    sss.current.setAttribute("id", "qqq");
  }, []);

  return (
    <div>
      <FancyButton age={99} ref={sss}>
        Click me!2
      </FancyButton>
    </div>
  );
}

export default ForwardRef2; */

// 如果要在函数组件中使用 ref，你可以使用 forwardRef（可与 useImperativeHandle 结合使用），或者可以将该组件转化为 class 组件。
/* function FancyInput(props, ref) {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    }
  }));
  return <input ref={inputRef} />;
} 
FancyInput = forwardRef(FancyInput); */

const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();

  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current.focus();
    },
    setValue: (txt) => {
      inputRef.current.setAttribute("value", txt);
    }
  }));
  return (
    <div>
      <h2>{props.age}</h2>
      <input ref={inputRef} />
    </div>
  );
});
const FancyInput2 = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    focus: () => {
      console.log(99);
    },
    setValue: (txt) => {
      console.log(44);
    }
  }));
  return (
    <div>
      <h2>{JSON.stringify(props)}</h2>
    </div>
  );
});

function Refs() {
  const inputRef = useRef();
  const inputRef2 = useRef();

  useEffect(() => {
    console.log(inputRef.current);
    inputRef.current.focus();
    inputRef.current.setValue("bbc");

    inputRef2.current.focus();
  }, []);

  return (
    <div>
      <FancyInput age={23} ref={inputRef} />
      <FancyInput2 age={23} ref={inputRef2} />
    </div>
  );
}
export default Refs;
