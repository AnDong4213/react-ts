[precommit 提交前格式化代码](https://prettier.io/docs/en/precommit.html)

[prettier 代码美化](https://prettier.io/docs/en/install.html)

### `React的新特性`

- Context

  ##### <font size=3 color=#666 face="黑体">Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。(能够让数据在组件树中传递而不必一级一级的手动传递)。使用 Context 之前的考虑，Context 主要应用场景在于很多不同层级的组件需要访问同样一些的数据。请谨慎使用，因为这会使得组件的复用性变差</font>

- ContextType
  ##### <font size=3 color=#666 face="黑体">挂载在 class 上的 contextType 属性会被重赋值为一个由 React.createContext() 创建的 Context 对象。这能让你使用 this.context 来消费最近 Context 上的那个值。你可以在任何生命周期中访问到它，包括 render 函数中。 MyClass.contextType = MyContext;</font>
- lazy
- Suspense
  <font size=3 color=#666 face="黑体">封装的是组件的导入行为，而不是组件本身。<Suspense fallback={<div>Loading</div>}></Suspense>里的 fallback 传入的是 jsx，而不是组件实例</font>
- memo

#### `3-3 Lazy与Suspense实现延迟加载`

##### `代码分割 `

<font size=3 color=#666 face="黑体">打包是个非常棒的技术，但随着你的应用增长，你的代码包也将随之增长。尤其是在整合了体积巨大的第三方库的情况下。你需要关注你代码包中所包含的代码，以避免因体积过大而导致加载时间过长。为了避免搞出大体积的代码包，在前期就思考该问题并对代码包进行分割是个不错的选择。代码分割能够创建多个包并在运行时动态加载。<br /></font>
<font size=3 color=#666 face="黑体">对你的应用进行代码分割能够帮助你“懒加载”当前用户所需要的内容，能够显著地提高你的应用性能。尽管并没有减少应用整体的代码体积，但你可以避免加载用户永远不需要的代码，并在初始加载的时候减少所需加载的代码量。</font>

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

<font size=3 color=#666 face="黑体">如果模块加载失败（如网络问题），它会触发一个错误。你可以通过异常捕获边界（Error boundaries）技术来处理这些情况，以显示良好的用户体验并管理恢复事宜。</font>

#### `3-4 Memo实现指定组件进行渲染`

<font size=3 color=#666 face="黑体">示例</font>
