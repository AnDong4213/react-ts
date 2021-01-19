import React, { Component, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";

const Home = lazy(() => import(/* webpackChunkName: 'home' */ "./pages/home"));
const About = lazy(() =>
  import(/* webpackChunkName: 'about' */ "./pages/about")
);
const Dashboard = lazy(() =>
  import(/* webpackChunkName: 'dashboard' */ "./pages/dashboard")
);
const CreateContext = lazy(() =>
  import(/* webpackChunkName: 'create-context' */ "./pages/create-context")
);
const LazySuspense = lazy(() =>
  import(/* webpackChunkName: 'lazy-suspense' */ "./pages/lazy-suspense")
);
const Memo = lazy(() => import(/* webpackChunkName: 'memo' */ "./pages/memo"));
const Hook = lazy(() => import(/* webpackChunkName: 'hook' */ "./pages/hook"));

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
              <Link to="/about">About</Link>
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
          </ul>

          <hr />

          <div className="router-switch">
            <Suspense fallback={<div>Loading</div>}>
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
              </Switch>
            </Suspense>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
