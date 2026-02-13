import { Button, Checkbox, Form, Input } from "antd";
import { CloseIcon, UserIcon, LockIcon } from "@/ui/Icons";
import styles from "./AuthForm.module.scss";

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

export const AuthForm = () => {
  return (
    <Form
      name="basic"
      initialValues={{ remember: true }}
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      autoComplete="off"
      className={styles.authForm}
      requiredMark={false}
    >
      <Form.Item<FieldType>
        label="Логин"
        name="username"
        layout="vertical"
        rules={[{ required: true, message: "Пожалуйста, введите логин!" }]}
      >
        <Input prefix={<UserIcon />} allowClear={{ clearIcon: <CloseIcon /> }} />
      </Form.Item>

      <Form.Item<FieldType>
        label="Пароль"
        name="password"
        layout="vertical"
        rules={[{ required: true, message: "Пожалуйста, введите пароль!" }]}
      >
        <Input.Password prefix={<LockIcon />} />
      </Form.Item>

      <Form.Item<FieldType>
        name="remember"
        valuePropName="checked"
        label={null}
      >
        <Checkbox>Запомнить данные</Checkbox>
      </Form.Item>

      <Form.Item label={null}>
        <Button type="primary" htmlType="submit">
          ойти
        </Button>
      </Form.Item>
    </Form>
  );
};
