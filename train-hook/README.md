[precommit 提交前格式化代码](https://prettier.io/docs/en/precommit.html)

[prettier 代码美化](https://prettier.io/docs/en/install.html)

### `React的新特性`

- Context

  ##### <font size=2 color=#666 face="黑体">Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。(能够让数据在组件树中传递而不必一级一级的手动传递)。使用 Context 之前的考虑，Context 主要应用场景在于很多不同层级的组件需要访问同样一些的数据。请谨慎使用，因为这会使得组件的复用性变差</font>

- ContextType

##### <font size=2 color=#666 face="黑体">挂载在 class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象。这能让你使用 this.context 来消费最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中。 MyClass.contextType = MyContext;</font>

- lazy
- Suspense
  <font size=2 color=#666 face="黑体">封装的是组件的导入行为，而不是组件本身。`<Suspense fallback={<div>Loading</div>}></Suspense>`里的 fallback 传入的是 jsx，而不是组件实例</font>
- memo

#### `3-3 Lazy与Suspense实现延迟加载`

##### `代码分割 `

<font size=2 color=#666 face="黑体">打包是个非常棒的技术，但随着你的应用增长，你的代码包也将随之增长。尤其是在整合了体积巨大的第三方库的情况下。你需要关注你代码包中所包含的代码，以避免因体积过大而导致加载时间过长。为了避免搞出大体积的代码包，在前期就思考该问题并对代码包进行分割是个不错的选择。代码分割能够创建多个包并在运行时动态加载。<br /></font>
<font size=2 color=#666 face="黑体">对你的应用进行代码分割能够帮助你“懒加载”当前用户所需要的内容，能够显著地提高你的应用性能。尽管并没有减少应用整体的代码体积，但你可以避免加载用户永远不需要的代码，并在初始加载的时候减少所需加载的代码量。</font>

> **import() 在应用中引入代码分割的最佳方式是通过 动态 import()语法。**<br />
> React.lazy (React.lazy 函数能让你像渲染常规组件一样处理动态引入（的组件）)<br />
> React.lazy 接受一个函数，这个函数需要动态调用 import()。它必须返回一个 Promise，该 Promise 需要 resolve 一个 default export 的 React 组件，然后应在 Suspense 组件中渲染 lazy 组件，如此使得我们可以使用在等待加载 lazy 组件时做优雅降级

```javascript
import React, { Suspense } from "react";
const OtherComponent = React.lazy(() => import("./OtherComponent"));
const AnotherComponent = React.lazy(() => import("./AnotherComponent"));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </div>
  );
}
```

##### `异常捕获边界（Error boundaries） `

<font size=2 color=#666 face="黑体">如果模块加载失败（如网络问题），它会触发一个错误。你可以通过异常捕获边界（Error boundaries）技术来处理这些情况，以显示良好的用户体验并管理恢复事宜。</font>

#### `3-4 Memo实现指定组件进行渲染`

<font size=2 color=#666 face="黑体">使用 React.PureComponent 来代替手写 shouldComponentUpdate。但它只进行浅比较，所以当 props 或者 state 某种程度是可变的话，浅比较会有遗漏，那你就不能使用它了。<br /></font>
<font size=2 color=#666 face="黑体">memo 用于无状态组件，非 class 组件</font>

> memo 用来优化函数组件的重渲染行为，当传入属性值都不变的情况下，就不会触发组件的重渲染。<br />
> memo 针对的是组件的渲染是否重复执行而 useMemo 则定义了一段函数逻辑是否重复执行，都是利用同样的算法来判定依赖是否发生改变，决定是否触发特定逻辑，仅仅用来做性能优化用。<br />
> memo 函数根据属性来决定是否重新渲染组件，useMemo 可以根据指定的依赖来决定一段函数逻辑是否重新执行，从而优化性能。<br />
> useEffect 执行的是副作用，在渲染之后运行， useMemo 是希望有返回值的，而返回值可直接参与渲染，因此在渲染期间完成的。<br />
> 函数句柄的变化导致组件也被连带重新渲染，用 useCallback 进行优化，如果 useMemo 返回的是一个函数，可以直接用 useCallback 来省略顶层的函数，useMemo 的一个变体 useMemo(() => fn) --> useCallback(fn)。<br />
> 使用 useCallback 不能阻止创建新的函数，但这个函数不一定会被返回，很可能创建出来就抛弃不用了，解决的是传入子组件的函数参数过度变化导致子组件过度渲染的问题。
> ref 获取子组件或者 dom 元素的句柄 渲染周期之间共享数据的存储。

```java
  export default function App() {
    // 不应放到依赖里
    const value = { name: 1 };// 每次App组件渲染，value变量都会被定义一次

    // 可以放到依赖里
    // useMemo 的意思就是：不要每次渲染都重新定义，而是我让你重新定义的时候再重新定义(第二个参数，依赖列表)
    const value = React.useMemo(() => {
      return { name: 1 };
    }, []);

    React.useEffect(() => {
      alert("render");
    }, [value]);

    return (
      <div className="App"></div>
    );
  }

  如果你定义了一个变量，满足下面的条件就最好用useMemo和useCallback给包裹住：
  1. 它不是状态，也就是说，不是用useState定义的(redux中的状态实际上也是用useState定义的)
  2. 它不是基本类型
  3. 它会被放在useEffect的依赖列表里 || 自定义hook的返回值
```

### `Hooks简介`

> `动机：`1.在组件之间复用状态逻辑很难(React 需要为共享状态逻辑提供更好的原生途径) ，2.复杂组件变得难以理解 3.难以理解的 class<br />
> Hook 用来解决什么问题？一句话，Hook 是用来让我们更好地复用 React 状态逻辑代码的。注意这里说的不是模板代码，模板代码可以用组件来复用；而单纯的状态逻辑代码没法用组件复用。<br />
> 有的同学可能会说，普通的函数不就可以实现逻辑代码复用吗？答案是：普通的函数可以复用逻辑代码，但是没法复用带状态的逻辑代码。<br />

### `Hooks FAQ`

<font size=2 color=#666 face="黑体">

`Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。`

`我的 React 知识还有多少是仍然有用的？ Hook 是使用你已经知道的 React 特性的一种更直接的方式 —— 比如 state，生命周期，context，以及 refs。它们并没有从根本上改变 React 的工作方式，你对组件，props, 以及自顶向下的数据流的知识并没有改变。`

`Hook 能否覆盖 class 的所有使用场景？我们给 Hook 设定的目标是尽早覆盖 class 的所有使用场景。目前暂时还没有对应不常用的 getSnapshotBeforeUpdate，getDerivedStateFromError 和 componentDidCatch 生命周期的 Hook 等价写法，但我们计划尽早把它们加进来。`

`生命周期方法要如何对应到 Hook？componentDidMount, componentDidUpdate, componentWillUnmount：useEffect Hook 可以表达所有这些(包括 不那么 常见 的场景)的组合。`

`我该如何使用 Hook 进行数据获取？ https://www.robinwieruch.de/react-hooks-fetch-data/`

`有类似实例变量的东西吗？useRef() Hook 不仅可以用于 DOM refs。「ref」 对象是一个 current 属性可变且可以容纳任意值的通用容器，类似于一个 class 的实例属性。`

`我该如何实现 getDerivedStateFromProps？ 可以在渲染过程中更新 state 。React 会立即退出第一次渲染并用更新后的 state 重新运行组件以避免耗费太多性能。`

`有类似 forceUpdate 的东西吗？ const [ignored, forceUpdate] = useReducer(x => x + 1, 0);`

`如何记忆计算结果？ useMemo Hook 允许你通过「记住」上一次计算结果的方式在多次渲染的之间缓存计算结果。记住，传给 useMemo 的函数是在渲染期间运行的。不要在其中做任何你通常不会在渲染期间做的事。举个例子，副作用属于 useEffect，而不是 useMemo。可以把 useMemo 作为一种性能优化的手段，但不要把它当做一种语义上的保证。`

</font>

> 如何惰性创建昂贵的对象？
> `有时候需要确保一个对象仅被创建一次，第一个常见的使用场景是当创建初始 state 很昂贵时：`
>
> ```javascript
> function Table(props) {
>   // ⚠️ createRows() 每次渲染都会被调用
>   const [rows, setRows] = useState(createRows(props.count));
>   // ...
> }
> ```

> 为避免重新创建被忽略的初始 state，我们可以传一个 函数 给 useState：
>
> ```javascript
> function Table(props) {
>   // ✅ createRows() 只会被调用一次
>   const [rows, setRows] = useState(() => createRows(props.count));
>   // ...
> }
> ```
>
> React 只会在首次渲染时调用这个函数

<font size=2 color=#666 face="黑体">示例</font>
