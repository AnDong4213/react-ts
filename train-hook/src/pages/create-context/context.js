import { createContext } from "react";

// createContext参数默认值只有在没有 <BatteryContext.Provider value={battery}> 的情况下才有效，在Consumer找不到Provider的时候
const BatteryContext = createContext(100);
const OnlineContext = createContext(false);

export { BatteryContext, OnlineContext };
