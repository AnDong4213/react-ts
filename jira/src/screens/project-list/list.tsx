import { User } from "screens/project-list/search-panel";
import { Table, TableProps, Dropdown, Menu } from "antd";
import dayjs from "dayjs";
// import { TableProps } from "antd/es/table";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";

export interface Project {
  id: number;
  name: string;
  personId: number;
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
  const { mutate } = useEditProject();
  // const pinProject = (id: number, pin: boolean) => mutate({ id, pin });
  // 用柯里化写point-free风格的代码
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

  const columns = [
    {
      title: <Pin checked={true} disabled={true} />,
      render(value: any, project: Project) {
        return (
          <Pin
            checked={project.pin}
            // onCheckedChange={(pin) => pinProject(project.id, pin)}
            onCheckedChange={pinProject(project.id)}
          />
        );
      },
    },
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
    {
      render(value: any, project: Project) {
        return (
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={"edit"}></Menu.Item>
              </Menu>
            }
          >
            <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <Table rowKey={"id"} pagination={false} columns={columns} {...props} />
  );
};
