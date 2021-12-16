import React, { Component, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

// 在代码中用import动态导入一个模块，Webpack 解析到该语法时，会自动进行代码分割，把import要导入的模块极其依赖打成一个独立的js文件，默认情况下不会加载，只有用到的时候才去加载
const Home = lazy(() => import(/* webpackChunkName: 'home' */ "./pages/home"));
const About = lazy(() =>
  import(/* webpackChunkName: 'about' */ "./pages/about")
);
const Dashboard = lazy(() =>
  import(/* webpackChunkName: 'dashboard' */ "./pages/dashboard")
);
const CreateContext = lazy(() =>
  import(
    /* webpackChunkName: 'create-context' */ "./pages/create-context/index"
  )
);
const LazySuspense = lazy(() =>
  import(/* webpackChunkName: 'lazy-suspense' */ "./pages/lazy-suspense")
);
const Memo = lazy(() =>
  import(/* webpackChunkName: 'memo' */ "./pages/memo/index")
);
const Hook = lazy(() =>
  import(/* webpackChunkName: 'hook' */ "./pages/hook/index1")
);
const Redux = lazy(() =>
  import(/* webpackChunkName: 'redux' */ "./pages/redux/index6-async")
);
const Test = lazy(() =>
  import(/* webpackChunkName: 'test' */ "./pages/test/index1")
);
const UseReducer = lazy(() =>
  import(/* webpackChunkName: 'use-reducer' */ "./pages/use-reducer/index")
);
const HooksFaq = lazy(() =>
  import(/* webpackChunkName: 'hooks-faq' */ "./pages/hooks-faq")
);
const Refs = lazy(() => import(/* webpackChunkName: 'refs' */ "./pages/refs"));

class App extends Component {
  render() {
    return (
      <Router>
        <div className="router-demo1">
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/about">About-(render prop)</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/createContext">createContext</Link>
            </li>
            <li>
              <Link to="/lazySuspense">lazySuspense</Link>
            </li>
            <li>
              <Link to="/memo">Memo</Link>
            </li>
            <li>
              <Link to="/hook">Hook</Link>
            </li>
            <li>
              <Link to="/redux">Redux</Link>
            </li>
            <li>
              <Link to="/test">Test</Link>
            </li>
            <li>
              <Link to="/use-reducer">use-reducer</Link>
            </li>
            <li>
              <Link to="/hooks-faq">Hooks FAQ</Link>
            </li>
            <li>
              <Link to="/refs">Refs</Link>
            </li>
          </ul>

          <hr />

          <div className="router-switch">
            <Suspense fallback={<div>Loading1...</div>}>
              <Switch>
                <Route exact path="/home">
                  <Home />
                </Route>
                <Route path="/about">
                  <About />
                </Route>
                <Route path="/dashboard">
                  <Dashboard />
                </Route>
                <Route path="/createContext">
                  <CreateContext />
                </Route>
                <Route path="/lazySuspense">
                  <LazySuspense />
                </Route>
                <Route path="/memo">
                  <Memo />
                </Route>
                <Route path="/hook">
                  <Hook />
                </Route>
                <Route path="/redux">
                  <Redux />
                </Route>
                <Route path="/test">
                  <Test />
                </Route>
                <Route path="/use-reducer">
                  <UseReducer />
                </Route>
                <Route path="/hooks-faq">
                  <HooksFaq />
                </Route>
                <Route path="/refs">
                  <Refs />
                </Route>
              </Switch>
            </Suspense>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
