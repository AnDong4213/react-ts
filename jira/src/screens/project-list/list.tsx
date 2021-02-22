import { User } from "screens/project-list/search-panel";
import { Table } from "antd";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
}

interface ListProps {
  list: Project[];
  users: User[];
}

export const List = ({ list, users }: ListProps) => {
  // const { list, users } = props;
  const columns = [
    {
      title: "名称",
      dataIndex: "name",
      sorter: (a: Project, b: Project) => a.name.localeCompare(b.name),
    },
    {
      title: "负责人",
      render(text: any, project: Project) {
        return (
          <span>
            {users.find((user) => user.id === project.personId)?.name || "未知"}
          </span>
        );
      },
      // dataIndex: "personId",
      key: "personId",
    },
  ];

  return <Table pagination={false} dataSource={list} columns={columns}></Table>;
};
