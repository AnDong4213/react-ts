// import { useAsync } from "utils/use-async";
import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import { useQuery, useMutation, useQueryClient } from "react-query";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[], Error>(["projects", param], () =>
    client("projects", { data: cleanObject(param || {}) })
  );

  /* const { run, ...result } = useAsync<Project[]>();
  const fetchProjects = useCallback(
    () => client("projects", { data: cleanObject(param || {}) }),
    [client, param]
  );
  useEffect(() => {
    run(fetchProjects(), {
      retry: fetchProjects,
    });
  }, [fetchProjects, param, run]);
  return result; */
};

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );

  /* const { run, ...asyncResult } = useAsync();
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
  }; */
};

export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
  /* const { run, ...asyncResult } = useAsync();
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
  }; */
};

export const useProject = (id: number) => {
  const client = useHttp();

  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    { enabled: Boolean(id) }
  );
};
