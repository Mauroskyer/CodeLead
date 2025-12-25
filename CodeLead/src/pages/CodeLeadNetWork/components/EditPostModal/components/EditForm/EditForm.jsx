import { Form, Input } from "antd";
import React from "react"

const EditForm = ({ form, initialValues, onFinish }) => {
  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
    >
      <Form.Item
        name="title"
        label="Title"
        rules={[
          { required: true, message: "Title is required" },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="content"
        label="Content"
        rules={[
          { required: true, message: "Content is required" },
        ]}
      >
        <Input.TextArea rows={4} />
      </Form.Item>
    </Form>
  );
};

export default EditForm;