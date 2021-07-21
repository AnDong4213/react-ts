// Firebase初探：身份认证
// 用户使用app的第一步，就是身份认证，包括注册，登陆还有登出功能。Firebase的Auth模块就是对应身份认证这一点的。Firebase的登陆方式除了基本的邮箱+密码方式，还有第三方账号的登陆方式，包括Google，Facebook，twitter和Gihub，除此之外，Firebase也允许开发者自定义登陆方式
// 在启用某种登录方式时，需要在Firebase控制台的Auth模块中，在”登录方法“标签页下进行对应的启用

// 在真实环境中，如果使用Firebase这种第三方auth服务的话，本文件不需要开发者开发

import { User } from "types/user";

const apiUrl = process.env.REACT_APP_API_URL;

const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = async (data: { username: string; password: string }) => {
  const response = await fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    // console.log(await response.json());
    return handleUserResponse(await response.json());
  } else {
    return Promise.reject(await response.json());
  }
};

export const register = async (data: {
  username: string;
  password: string;
}) => {
  const response = await fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    return handleUserResponse(await response.json());
  } else {
    return Promise.reject(await response.json());
  }
};

export const logout = async () => {
  window.localStorage.removeItem(localStorageKey);
};
