import { useAuth } from "context/auth-context";
import { useAsync } from "utils/use-async";
import { Form, Input } from "antd";
import { LongButton } from "./index";

export const LoginScreen = ({
  onError,
}: {
  onError: (error: Error) => void;
}) => {
  const { login } = useAuth();
  const { run, isLoading } = useAsync(undefined, {
    throwOnError: true,
  });
  const handleSubmit = async (values: {
    username: string;
    password: string;
  }) => {
    // login(values);
    try {
      await run(login(values));
    } catch (error: any) {
      // console.log(error);
      onError(error);
    }
  };

  return (
    <Form onFinish={handleSubmit}>
      {/* {JSON.stringify(error1)} */}
      <Form.Item
        name={"username"}
        label="用户名"
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item
        label="密码"
        name="password"
        rules={[{ required: true, message: "请输入用密码" }]}
      >
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} type="primary" htmlType="submit">
          登录
        </LongButton>
      </Form.Item>
    </Form>
  );
};
