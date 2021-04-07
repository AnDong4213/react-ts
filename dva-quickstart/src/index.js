import dva from "dva";
import "./index.css";

// 1. Initialize
// const app = dva();
const app = dva({
  initialState: {
    /* products: [
      { name: "dva", id: 11 },
      { name: "antd", id: 22 },
      { name: "umi", id: 33 },
    ], */
  },
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(require("./models/products").default);

// 4. Router
app.router(require("./router").default);

// 5. Start
app.start("#root");

// console.log(app._store); // 顶部的 state 数据
/* const aObj = [{ x: 1 }, { y: 2 }, { z: 3 }].reduce(
  (prev, next) => {
    console.log(prev);
    // return Object.assign(prev, next);
    return { ...prev, ...next };
  },
  { m: 9 }
);

console.log(aObj); */
