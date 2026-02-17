import { useState } from "react";
import { Button, Form, Input, InputNumber, Modal, message } from "antd";
import { PlusCircleIcon } from "@/ui/Icons";
import styles from "./AddButton.module.scss";

export const AddButton = () => {
  const [form] = Form.useForm();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    messageApi.info("Позиция добавлена!");
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        className={styles["add-button"]}
        type="primary"
        icon={<PlusCircleIcon />}
        onClick={showModal}
      >
        Добавить
      </Button>
      {contextHolder}
      <Modal
        title="Добавить позицию"
        className={styles["add-modal"]}
        closable
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleOk}
          form={form}
          initialValues={{}}
          requiredMark={false}
        >
          <Form.Item
            label="Наименование"
            name="title"
            rules={[
              { required: true, message: "Пожалуйста, введите наименование!" }
            ]}
          >
            <Input placeholder="Наименование позиции" />
          </Form.Item>
          <Form.Item label="Вендор" name="brand">
            <Input placeholder="Название вендора" />
          </Form.Item>
          <Form.Item
            label="Артикул"
            name="sku"
            rules={[
              { required: true, message: "Пожалуйста, введите артикул!" }
            ]}
          >
            <Input placeholder="Артикул позиции" />
          </Form.Item>
          <Form.Item
            label="Цена"
            name="price"
            rules={[{ required: true, message: "Пожалуйста, введите цену!" }]}
          >
            <InputNumber placeholder="Цена" min={0} />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Добавить
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
