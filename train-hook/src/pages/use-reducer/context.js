import { createContext } from "react";

// createContext参数默认值只有在没有 <ReducerContext.Provider value={battery}> 的情况下才有效，在Consumer找不到Provider的时候
const ReducerContext = createContext(null);

ReducerContext.displayName = "reducer-provider";

export { ReducerContext };
