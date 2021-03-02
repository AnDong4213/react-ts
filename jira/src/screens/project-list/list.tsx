import { User } from "screens/project-list/search-panel";
import { Table, TableProps } from "antd";
import dayjs from "dayjs";
// import { TableProps } from "antd/es/table";
import { Link } from "react-router-dom";
export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  // list: Project[];
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  // console.log("props", props);
  // const { list, users } = props;
  const columns = [
    {
      title: "名称",
      // dataIndex: "name",
      sorter: (a: Project, b: Project) => a.name.localeCompare(b.name),
      render(value: any, project: Project) {
        return <Link to={String(project.id)}>{project.name}</Link>;
      },
    },
    {
      title: "部门",
      dataIndex: "organization",
    },
    {
      title: "负责人",
      render(value: any, project: Project) {
        return (
          <span>
            {users.find((user) => user.id === project.personId)?.name || "未知"}
          </span>
        );
      },
    },
    {
      title: "创建时间",
      render(value: any, project: Project) {
        return (
          <span>
            {project.created
              ? dayjs(project.created).format("YYYY-MM-DD HH:mm")
              : "无"}
          </span>
        );
      },
    },
  ];

  return (
    <Table rowKey={"id"} pagination={false} {...props} columns={columns} />
  );
};
