import { useAsync } from "utils/use-async";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import { useQuery } from "react-query";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[], Error>(["projects", param], () =>
    client("projects", { data: cleanObject(param || {}) })
  );
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();

  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
