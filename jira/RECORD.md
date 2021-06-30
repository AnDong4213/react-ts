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
> 5-2 课程 把 json-server 给删除了<br />

#### `5-4 JWT原理与auth-provider实现`

> <font size=3 color=#666 face="黑体">示例</font>
