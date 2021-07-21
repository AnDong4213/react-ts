import { Project } from "screens/project-list/list";
import { cleanObject } from "utils";
import { useHttp } from "utils/http";
import { useQuery, useMutation, QueryKey } from "react-query";
import {
  useEditConfig,
  useAddConfig,
  useDeleteConfig,
} from "utils/use-optimistic-options";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[], Error>(["projects", param], () =>
    client("projects", { data: cleanObject(param || {}) })
  );
};

/* export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  const [searchParams] = useProjectsSearchParams();
  const queryKey = ["projects", searchParams];
  console.log("queryKey", queryKey);

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries(queryKey),
      // 要实现乐观更新才写下面的代码
      async onMutate(target) {
        const previousItems = queryClient.getQueryData(queryKey); // 数据列表
        console.log("previousItems", previousItems);
        console.log("target", target);
        queryClient.setQueryData(queryKey, (old?: Project[]) => {
          console.log("old", old);
          // 要向缓存里设置数据了，old代表了queryKey所代表的的缓存中的数据，"projects"的列表
          return (
            old?.map((project) =>
              project.id === target.id ? { ...project, ...target } : project
            ) || []
          );
        });

        return { previousItems };
      },
      // useMutation一发生onMutate就立刻被调用，当异步操作没成功时，把数据改了是不对的，需要回滚，onError
      onError(error, newItem, context) {
        queryClient.setQueryData(
          queryKey,
          (context as { previousItems: Project[] }).previousItems
        );
      },
    }
  );
}; */

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    {
      ...useEditConfig(queryKey),
    }
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    {
      ...useAddConfig(queryKey),
    }
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    {
      ...useDeleteConfig(queryKey),
    }
  );
};

export const useProject = (id: number) => {
  const client = useHttp();

  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    { enabled: Boolean(id) }
  );
};
