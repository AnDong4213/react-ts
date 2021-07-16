[precommit 提交前格式化代码](https://prettier.io/docs/en/precommit.html)

[prettier 代码美化](https://prettier.io/docs/en/install.html)

<font size=3 color=#666 face="黑体">父子组件，父组件包裹子组件时，如果代码在 useEffect 里先运行子组件里的，在运行父组件里的；如果不在 useEffect 里反之；；改变父组件的动态变量，会重载父子组件的全部内容，有些组件不需要重载所以需要优化。</font>

#### `3-4 自定义Hook - 用useDebounce减少工程搜索请求频率`

<font size=3 color=#666 face="黑体">在页面刚加载时，执行一次 useEffect 的时候</font>

```javascript
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};
```

<font size=3 color=#666 face="黑体">函数防抖</font>

```javascript
const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);
  return debouncedValue;
};
```

#### `5-1 用React表单、TS的类型继承和鸭子类型实现登录表单 `

> **鸭子类型(duck typing): 面向接口编程而不是面向对象编程。**<br />
> 5-2 课程 把 json-server 给删除了，开始用 jira-dev-tool 了<br />

#### `5-4 JWT原理与auth-provider实现`

> JWT 的全称是 JSON Web Tokens，[JWT](https://jwt.io/)<br />
> 在一个函数前加上 async，就可以使用 then 了

#### `5-7 用fetch抽象通用HTTP请求方法，增强通用性`

> 在登录的状态，让每个请求都自动的携带 token 去请求服务端保持登录的状态。<br />
> 在 fetch 的 api 里，服务端返回的异常状态，fetch 的 api 后跟的 catch 里并不会抛出异常， 在断网时，网络未连接时会抛出，概率很小<br />
> axios 和 fetch 的表现不一样，axios 可以直接在返回状态不为 2xx 的时候抛出异常<br />

#### `5-8 用useHttp管理JWT和登录状态，保持登录状态`

> 页面刷新时，user 没有了，初始化 user，bootstrapUser 函数<br />
> App.tsx `{user ? <AuthenticatedApp /> : <UnauthenticatedApp />}`

#### `5-9 TS 的联合类型、Partial 和 Omit 介绍`

> Utility Types 的用法：(Parameters 是其中一个)用泛型给它传入一个其他类型，然后 utility type 对这个类型进行某种操作<br />
> TS 中的 typeof 把变量把类型提取出来，是在静态环境运行的。JS 中的 typeof 是在 runtime 时运行的<br />
> 符串字面量类型 keyof(把一个对象类型的 key 全部取出来，形成一个联合类型)<br />
> partial--部分的 omit--忽略 Partial，Omit，Pick。Exclude-操作的是字符串字面量类型，联合类型)<br />

#### `6-1 安装与使用 antd 组件库`

> localeCompare，localeCompare 是一种基于国际化字体的地区字符比较，例如中国用中文，美国用英文，法国用法文，德国用德文。。将这些国家的文字按照国家/地区等进行编号，然后每个编号都对应了该国/地区的文字。<br /> > `(a, b) => a.name.localeCompare(b.name)`<br />

#### `7-1 给页面添加Loading和Error状态，增加页面友好性`

> ```javascript
> import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
> ```
>
> 图片转化为组件<br />
> interface ListProps extends TableProps<Project> {}

#### `7-5 实现Error Boundaries，捕获边界错误`

> throw new Error("点击抛出异常")，不会触发 ErrorBoundary。const value: any = undefined;{value.notExist}触发 <br />

> `声明组件TS的两种写法` [react-error-boundary](https://github.com/bvaughn/react-error-boundary#readme)

```javascript
type FallbackRender = (props: { error: Error | null }) => React.ReactElement;
<br />;
export class ErrorBoundary extends React.Component<
  {
    children: ReactNode,
    fallbackRender: FallbackRender,
  },
  { error: Error | null }
> {}
<br />;
export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>,
  { error: Error | null }
> {}
<br />;
type PropsWithChildren<P> = P & { children?: ReactNode };
```

#### `8-2 ⽤useRef实现useDocumentTitle - useRef与Hook 闭包详解`

> jira\src\screens\project-list\test.tsx

#### `8-5 初步实现 useUrlQueryParam 管理 URL 参数状态`

> http://localhost:4008/test?personId=2&name=wxchat

```javascript
const searchUrl = window.location.search;
const searchParams = new URLSearchParams(searchUrl);
console.log(searchUrl); // ?personId=2&name=wxchat
console.log(searchParams); // URLSearchParams {}
for (let p of searchParams) {
  console.log(p); // ["personId", "2"]  ["name", "wxchat"]
}
console.log(searchParams.get("name")); // wxchat
```

> as const 适用于元组(Tuple);<br />
> const aa = ["33"]; const aa: string[];<br />
> const aa = ["33"] as const; const aa: readonly ["33"];

#### `8-6 用useMemo解决依赖循环问题 - Hook的依赖问题详解`

> 只有泛型，能够允许暂时不指定具体的类型，根据传入的值动态判断类型。<br />
> @welldone-software/why-did-you-render，帮助监测是什么造成页面的渲染，造成无限渲染的原因。<br />
> 当 obj 是基本类型的时候，就不会无限循环，当 obj 是对象的时候，就会无限循环，当 obj 是对象的 state 时，不会无限循环。<br />
> 基本类型，可以放到依赖里；useState 组件状态，可以放到依赖里；非组件状态的对象，绝不可以放到依赖里。<br />

```java
  export const useProjectsSearchParams = () => {
    const [param, setParam] = useUrlQueryParam(["name", "personId"]);

    return [
      useMemo(
        () => ({ ...param, personId: Number(param.personId) || undefined }),
        [param]
      ),
      setParam,
    ] as const;
  };
  // 用useMemo把非组件状态的对象包裹起来，可以放到依赖里，用useCallback包裹的函数也可以放到依赖里
  const [param, setParam] = useProjectsSearchParams();
  const { isLoading, error, data: list, retry } = useProjects(
    useDebounce(param, 200)
  );
  // useMemo和useCallback都是为了依赖而存在的，非基本类型做依赖时，用useMemo和useCallback包裹起来，不要在每次页面渲染时侯重新创建
```

#### `9-2 抽象user-select组件选择用户`

```java
interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>; // Partial<>与某个对象属性设置为undefined
  setParam: (param: SearchPanelProps["param"]) => void;
}

export interface Project {
  id: number;
  name: string;
  personId: number; // personId为undefined
  pin: boolean;
  organization: string;
  created: number;
}
```

#### `9-3 用 useEditProject 编辑项目`

```java
  // 用柯里化写point-free风格的代码，两个参数获取的时机是不一样的
  const pinProject = (id: number, pin: boolean) => mutate({ id, pin });
  onCheckedChange={(pin) => pinProject(project.id, pin)}

  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin }).then(props.refresh);
  onCheckedChange={pinProject(project.id)}
```

#### `9-4 编辑后刷新-useState的懒初始化与保存函数状态`

```java
  // useState惰性初始 state
  // initialState 参数只会在组件的初始渲染中起作用，后续渲染时会被忽略。如果初始 state 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 state，此函数只在初始渲染时被调用：

  const [state, setState] = useState(() => {
    const initialState = someExpensiveComputation(props); // 非常昂贵的计算，很消耗性能，只会在组件的初始渲染中起作用，后续渲染时会被忽略。
    return initialState;
  });
  // 在useState中传入函数，有特殊意义的，是惰性初始 state，react并不认为我们是要保存函数，要惰性初始 state。如果要保存函数，需要在加一层
  // useState(() => () => alert(9))，也可以用useRef保存函数
  // useRef不是useState，用useRef定义的值并不是组件的状态，只是一个普通的变量，useRef的容器里保存的值改变的时候，不会触发组件重新渲染
```

#### `10-3 状态提升，组合组件与控制反转(下)`

> ES6 明确规定，如果区块中存在 let 和 const 命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。在代码块内，使用 let 命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。<br />
> 状态提升可以让组件共享状态，但是容易造成 prop drilling。<br />
> 如果你只是想避免层层传递一些属性，组件组合（component composition）有时候是一个比 context 更好的解决方案。<br />
> 控制反转是一种设计模式。<br />

#### `10-5 用useReducer进行状态管理`

> useState 与 useReducer。useState 适合定义单个的状态，useReducer 适合定义一群会互相影响的状态。

#### `10-9 为什么我们需要redux-thunk？`

> [redux](https://github.com/reduxjs/redux) [react-redux](https://github.com/reduxjs/react-redux) [redux-thunk](https://github.com/reduxjs/redux-thunk)

```java
  // 纯redux
  /* export {
    createStore,
    combineReducers,
    bindActionCreators,
    applyMiddleware,
    compose,
    __DO_NOT_USE__ActionTypes
  } */
  constructor(props) {
    super(props);
    this.state = store.getState();
    store.subscribe(this.handleStoreChange)
  }
  handleStoreChange() {
    this.setState(store.getState())
  }
  // Store 允许使用store.subscribe方法设置监听函数，一旦 State 发生变化，就自动执行这个函数。
```

```java
  // react-redux的使用(非hooks)
  // Default: dispatch as a Prop。If you don't specify the second argument to connect(), your component will receive `dispatch` by default。
  connect()(MyComponent)
  // which is equivalent with
  connect(null, null)(MyComponent)
  // or
  connect(mapStateToProps /** no second argument */)(MyComponent)


  // Two Forms of mapDispatchToProps
  > Function form: Allows more customization, gains access to dispatch and optionally ownProps
  > Object shorthand form: More declarative and easier to use

  import { increment, decrement, reset } from './counterActions'
  const actionCreators = {
    increment,
    decrement,
    reset,
  }
  export default connect(mapState, actionCreators)(Counter)
  // or
  export default connect(mapState, { increment, decrement, reset })(Counter)

};
```

#### `dispatch可以放到异步的回调函数里，很少这样做。redux有异步的功能，redux-thunk可以帮助隐藏异步或同步实现的细节，让异步代码也能像普通的actionCreator一样写在actionCreator里`

```java
  // 只有引入了 redux-thunk 才能这样用
  const handleInputChange = (e) => (dispatch) => {
    const action = {
      type: "change_input_value",
      value: e.target.value
    };
  dispatch(action);

  export const handleCustomItem = () => async (dispatch, state) => {
    console.log("state", state());
    const url = await axios.get(
      "https://api.thecatapi.com/v1/images/search?limit=1"
    );
    const item = url.data[0].url;

    dispatch({
      type: "add_item_custom",
      item
    });
  };
```

> <font size=3 color=#666 face="黑体">示例</font>
