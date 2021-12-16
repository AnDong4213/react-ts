import React, { Component, lazy, Suspense } from "react";
import ErrorBoundary from "../../components/error-boundary";

const Test = lazy(() =>
  import(/* webpackChunkName: 'andong' */ "../../components/test")
);

/* class LazySuspense extends Component {
  state = {
    hasError: false
  };

  // 异常捕获边界（Error boundaries）
  // componentDidCatch() {
  //   this.setState({
  //     hasError: true
  //   });
  // }
  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h3>Error</h3>;
    }
    return (
      <div>
        <Suspense fallback={<div>Loading</div>}>
          <Test />
        </Suspense>
      </div>
    );
  }
} */

class LazySuspense extends Component {
  render() {
    return (
      <ErrorBoundary>
        <Suspense fallback={<div>Loading2...</div>}>
          <Test />
        </Suspense>
      </ErrorBoundary>
    );
  }
}

export default LazySuspense;

// 在代码中用import动态导入一个模块，Webpack 解析到该语法时，会自动进行代码分割，把import要导入的模块极其依赖打成一个独立的js文件，默认情况下不会加载，只有用到的时候才去加载
