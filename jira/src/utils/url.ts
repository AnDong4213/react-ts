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
    (params: Partial<{ [key in K]: string }>) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit;
      console.log("o", searchParams);
      return setSearchParams(o);
    },
  ] as const;
};
