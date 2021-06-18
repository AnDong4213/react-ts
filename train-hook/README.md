[precommit 提交前格式化代码](https://prettier.io/docs/en/precommit.html)

[prettier 代码美化](https://prettier.io/docs/en/install.html)

### `React的新特性`

- Context

  ##### <font size=3 color=#666 face="黑体">Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。(能够让数据在组件树中传递而不必一级一级的手动传递)</font>

  ##### <font size=3 color=#666 face="黑体"使用 Context 之前的考虑，Context 主要应用场景在于很多不同层级的组件需要访问同样一些的数据。请谨慎使用，因为这会使得组件的复用性变差</font>

- ContextType
- lazy
- Suspense
- memo

#### `3-1 Context实现跨层级的组件数据传递`

<font size=3 color=#666 face="黑体">示例</font>
