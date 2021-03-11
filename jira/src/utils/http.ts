import qs from "qs";
import * as auth from "auth-provider";
import { useAuth } from "context/auth-context";
import { useCallback } from "react";
// import { useCallback } from "react";

const apiUrl = process.env.REACT_APP_API_URL;

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      "Content-Type": data ? "application/json" : "",
      Authorization: token ? `Bearer ${token}` : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  // axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};

export const useHttp = () => {
  const { user } = useAuth();

  return useCallback(
    (...[endpoint, config]: Parameters<typeof http>) =>
      http(endpoint, { ...config, token: user?.token }),
    [user?.token]
  );
};
// utility type 的用法：用泛型给它传入一个其他类型，然后utility type对这个类型进行某种操作
// TS中的typeof把变量把类型提取出来

// 类型别名在很多情况下可以和interface互换
/* type person = {
  name: string;
}; */
/* interface person {
  name: string;
}
let b: person = { name: "9" };

// 联合类型  interface 在这种情况下没法替代type
type FavoriteNumber = number | string;
let a: FavoriteNumber = 10;
console.log(a);
console.log(b);

// interface 也没法实现Utility type
type Person = {
  name: string;
  age: number;
};
type PersonKeys = keyof Person; // 字符串字面量类型  keyof(把一个对象类型的key全部取出来，形成一个联合类型)
type PersonOnlyName = Pick<Person, "name">; // 与omit相反
type Age = Exclude<PersonKeys, "name">;

// partial--部分的   omit--忽略    Partial，Omit，Pick，Exclude(操作的是字符串字面量类型)
let xm: Partial<Person> = { name: "xiaoming" };
let shenmiren: Omit<Person, "name"> = { age: 33 };
let c: PersonKeys = "age";
let d: PersonOnlyName = { name: "99" };
let e: Age = "age";

console.log("xm", xm);
console.log("shenmiren", shenmiren);
console.log("c", c);
console.log("d", d);
console.log("e", e);

// Partial 的实现
type Partial<T> = {
  [P in keyof T]?: T[P];
}; */

// TS是类型约束系统
