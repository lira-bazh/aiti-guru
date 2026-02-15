import { useNavigate } from "react-router";
import { Button, Checkbox, Form, Input, type FormProps } from "antd";
import { CloseIcon, UserIcon, LockIcon } from "@/ui/Icons";
import { AuthorizationServices } from "@/services/auth";
import { ROUTES } from "@/constants";
import styles from "./AuthForm.module.scss";


type FieldType = {
  username: string;
  password: string;
  remember: boolean;
};

export const AuthForm = () => {
  const navigate = useNavigate();

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    if (values.username && values.password) {
      const result = await AuthorizationServices.login(values);

      if (result) {
        navigate(ROUTES.products());
      }
    }
  };

  return (
    <Form
      name="basic"
      initialValues={{ remember: false }}
      onFinish={onFinish}
      autoComplete="off"
      className={styles.authForm}
      requiredMark={false}
    >
      <Form.Item<string>
        label="Логин"
        name="username"
        layout="vertical"
        rules={[{ required: true, message: "Пожалуйста, введите логин!" }]}
      >
        <Input
          prefix={<UserIcon />}
          allowClear={{ clearIcon: <CloseIcon /> }}
        />
      </Form.Item>

      <Form.Item<string>
        label="Пароль"
        name="password"
        layout="vertical"
        rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}
      >
        <Input.Password prefix={<LockIcon />} />
      </Form.Item>

      <Form.Item<boolean> name="remember" valuePropName="checked">
        <Checkbox>Запомнить данные</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block>
          Войти
        </Button>
      </Form.Item>
    </Form>
  );
};
