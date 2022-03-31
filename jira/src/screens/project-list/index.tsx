import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "../../utils";
import { useUsers } from "utils/user";
import { useProjects } from "utils/project";
// import { useUrlQueryParam2 } from "utils/url";
import { useProjectModal, useProjectsSearchParams } from "./util";
import {
  ButtonNoPadding,
  ErrorBox,
  Row,
  ScreenContainer,
} from "components/lib";
// import { Test } from "./test";
// 状态提升可以让组件共享状态，但是容易造成 prop drilling

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
  const { open } = useProjectModal();
  /* const [, setParam] = useState({
    name: "",
    personId: "",
  }); */
  /* const [keys] = useState<("name" | "personId")[]>(["name", "personId"]);
  const [param2] = useUrlQueryParam2(keys); */
  // console.log("param2", param2);
  // 基本类型，可以放到依赖里；组件状态，可以放到依赖里；非组件状态的对象，绝不可以放到依赖里
  // 不要在每次渲染时都重新创建
  const [param, setParam] = useProjectsSearchParams();
  // const debounceParam = useDebounce(param, 200);
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
  const { data: users } = useUsers();
  console.log(process.env);

  const changeUrl = () => {
    setParam({ name: "YY" });
  };
  return (
    <ScreenContainer>
      <Row between={true}>
        <h1 onClick={changeUrl}>项目列表-{JSON.stringify(isLoading)}</h1>
        <ButtonNoPadding onClick={open} type={"link"}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam} />
      {error ? <ErrorBox error={error} /> : null}
      <List dataSource={list || []} loading={isLoading} users={users || []} />
    </ScreenContainer>
  );
};

ProjectListScreen.whyDidYouRender = false;
