// import { useState } from "react";
import { Typography } from "antd";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { useDebounce, useDocumentTitle } from "../../utils";
import styled from "@emotion/styled";
import { useUsers } from "utils/user";
import { useProjects } from "utils/project";
// import { useUrlQueryParam2 } from "utils/url";
import { useProjectsSearchParams } from "./util";
import { Row } from "components/lib";
import { useDispatch } from "react-redux";
import { ButtonNoPadding } from "components/lib";
import { projectListActions } from "screens/project-list/project-list.slice";
// import { Test } from "./test";
// 状态提升可以让组件共享状态，但是容易造成 prop drilling

export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);
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
  const { isLoading, error, data: list, retry } = useProjects(
    useDebounce(param, 200)
  );
  const { data: users } = useUsers();
  const dispatch = useDispatch();

  const changeUrl = () => {
    setParam({ name: "YY" });
  };
  return (
    <Container>
      <Row between={true}>
        <h1 onClick={changeUrl}>项目列表-{JSON.stringify(isLoading)}</h1>
        <ButtonNoPadding
          onClick={() => dispatch(projectListActions.openProjectModal())}
          type={"link"}
        >
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        dataSource={list || []}
        loading={isLoading}
        users={users || []}
      />
    </Container>
  );
};

ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
