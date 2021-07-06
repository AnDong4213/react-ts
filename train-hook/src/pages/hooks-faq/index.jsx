// Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

// 我的 React 知识还有多少是仍然有用的？ Hook 是使用你已经知道的 React 特性的一种更直接的方式 —— 比如 state，生命周期，context，以及 refs。它们并没有从根本上改变 React 的工作方式，你对组件，props, 以及自顶向下的数据流的知识并没有改变。

// Hook 能否覆盖 class 的所有使用场景？我们给 Hook 设定的目标是尽早覆盖 class 的所有使用场景。目前暂时还没有对应不常用的 getSnapshotBeforeUpdate，getDerivedStateFromError 和 componentDidCatch 生命周期的 Hook 等价写法，但我们计划尽早把它们加进来。

// 生命周期方法要如何对应到 Hook？componentDidMount, componentDidUpdate, componentWillUnmount：useEffect Hook 可以表达所有这些(包括 不那么 常见 的场景)的组合。

// 我该如何使用 Hook 进行数据获取？  https://www.robinwieruch.de/react-hooks-fetch-data/

// 有类似实例变量的东西吗？useRef() Hook 不仅可以用于 DOM refs。「ref」 对象是一个 current 属性可变且可以容纳任意值的通用容器，类似于一个 class 的实例属性。

function HooksFaq() {
  return (
    <div>
      <h2>HooksFaq</h2>
    </div>
  );
}

export default HooksFaq;
