// import { jsx } from "@emotion/react";
import { Project } from "types/project";
import { Input, Form, Rate } from "antd";
import { UserSelect } from "components/user-select";
import { useState } from "react";

interface SearchPanelProps {
  // users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void;
}

export const SearchPanel = ({ param, setParam }: SearchPanelProps) => {
  const handleChange = (num: number) => {
    console.log(num);
    setValue(num);
  };
  const [value, setValue] = useState(0);
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          placeholder={"项目名"}
          type="text"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName={"负责人"}
          value={param.personId}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <Rate onChange={handleChange} count={5} value={value} />
      </Form.Item>
    </Form>
  );
};
