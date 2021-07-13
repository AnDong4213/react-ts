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
> 基本类型，可以放到依赖里；useState 组件状态，可以放到依赖里；非组件状态的对象，绝不可以放到依赖里。

> <font size=3 color=#666 face="黑体">示例</font>
