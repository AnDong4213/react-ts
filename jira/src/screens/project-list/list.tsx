import { User } from "types/user";
import { Table, TableProps, Dropdown, Menu, Modal } from "antd";
import dayjs from "dayjs";
// import { TableProps } from "antd/es/table";
import { Link } from "react-router-dom";
import { Pin } from "components/pin";
import { useDeleteProject, useEditProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal, useProjectsQueryKey } from "./util";
import { Project } from "../../types/project";

interface ListProps extends TableProps<Project> {
  users: User[];
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject(useProjectsQueryKey());
  // const pinProject = (id: number, pin: boolean) => mutate({ id, pin });  // 用柯里化写point-free风格的代码
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
        return <More project={project} />;
      },
      key: "id",
    },
  ];

  return (
    <Table rowKey={"id"} pagination={false} columns={columns} {...props} />
  );
};

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => startEdit(id);

  const { mutate } = useDeleteProject(useProjectsQueryKey());
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "确定要删除这个项目吗?",
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        mutate({ id });
      },
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item onClick={() => editProject(project.id)} key={"edit"}>
            编辑
          </Menu.Item>
          <Menu.Item
            onClick={() => confirmDeleteProject(project.id)}
            key={"delete"}
          >
            删除
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};
