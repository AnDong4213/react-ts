import { useQuery } from "react-query";
import { Task } from "types/task";
import { cleanObject } from "utils";
import { useHttp } from "utils/http";

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  return useQuery<Task[], Error>(["tasks", param], () =>
    client("tasks", { data: cleanObject(param || {}) })
  );
};
