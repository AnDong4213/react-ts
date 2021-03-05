import { useState, useEffect } from "react";
import { Typography } from "antd";
import { SearchPanel } from "./search-panel";
import { List } from "./list";
import { cleanObject, useMount, useDebounce } from "../../utils";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const debounceParam = useDebounce(param, 200);
  const client = useHttp();

  useEffect(() => {
    setIsLoading(true);
    client("projects", { data: cleanObject(debounceParam) })
      .then((res) => {
        setList(res);
      })
      .catch((error) => {
        setList([]);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParam]);

  useMount(() => {
    // 无形参风格(point-free)  函数式编程
    client("users").then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      {/* <SearchPanel param={param} setParam={setParam} users={users} /> */}
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List dataSource={list} loading={isLoading} users={users} />
    </Container>
  );
};

const Container = styled.div`
  padding: 3.2rem;
`;
