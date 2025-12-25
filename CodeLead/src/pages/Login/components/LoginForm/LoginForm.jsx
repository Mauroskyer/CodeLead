import { Form, Input, Alert } from "antd";
import useLoginStore from "../../../../store/auth.js";
import React from "react"

const LoginForm = ({ form, onFinish }) => {
  const { isLoading, error, clearError } = useLoginStore();

  return (
    <>
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          closable
          onClose={clearError}
          style={{ marginBottom: 16 }}
        />
      )}

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item
          label="Please enter your UserName"
          name="UserName"
          rules={[{ required: true }]}
        >
          <Input disabled={isLoading} autoFocus />
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;