import { Typography } from "antd";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "../../utils";
import styled from "@emotion/styled";
import { useUsers } from "utils/user";
import { useProjects } from "utils/project";
import { useProjectsSearchParams } from "./util";
// import { Test } from "./test";

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  /* const [, setParam] = useState({
    name: "",
    personId: "",
  }); */
  /* const [keys] = useState<("name" | "personId")[]>(["name", "personId"]);
  const [param] = useUrlQueryParam(keys); */
  // 基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，绝不可以放到依赖里
  const [param, setParam] = useProjectsSearchParams();
  // const debounceParam = useDebounce(param, 200);
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();

  return (
    <Container>
      <h1>项目列表{JSON.stringify(isLoading)}</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List dataSource={list || []} loading={isLoading} users={users || []} />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
