import { useSearchParams, URLSearchParamsInit } from "react-router-dom";
import { useMemo } from "react";
import { cleanObject } from "utils/index";

/* export const useUrlQueryParam = (keys: string[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    keys.reduce((prev, key) => {
      return { ...prev, [key]: searchParams.get(key) || "" };
    }, {} as { [key in string]: string }),
    setSearchParams,
  ] as const;
}; */

export const useUrlQueryParam2 = (keys: string[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    keys.reduce(
      (prev, key) => {
        return { ...prev, [key]: searchParams.get(key) || "" };
      },
      { a: 2 }
    ),
    setSearchParams,
  ] as const;
};

// http://localhost:5000/projects?personId=2&name=美图

// 返回页面url中，指定键的参数值
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParams, setSearchParams] = useSearchParams();
  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return { ...prev, [key]: searchParams.get(key) || "" };
        }, {} as { [key in K]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams), // 使用 Object.fromEntries 将数组转成对象
        ...params,
      }) as URLSearchParamsInit;
      console.log("o--", searchParams);
      return setSearchParams(o);
    },
  ] as const;
};
// Object.entries() 是将对象转成一个自身可枚举属性的键值对数组。

const aa = ["33"] as const;
