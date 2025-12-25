import { Form, Input } from "antd";
import { CreatePostCard, CreateButton } from "./styles/CreatedPostStyles.jsx";
import { useState } from "react";
import usePostsStore from "../../../../store/postsStore.js";
import useLoginStore from "../../../../store/auth.js";
import React from "react";

const CreatePost = () => {
  const [form] = Form.useForm();
  const addPost = usePostsStore((s) => s.addPost);
  const userName = useLoginStore((s) => s.userName);

  const [isUploading, setIsUploading] = useState(false);

  const onFinish = async (values) => {
    try {
      await addPost({
        username: userName,
        title: values.title,
        content: values.content,
      });

      form.resetFields();
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <CreatePostCard title="What's on your mind?">
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Content" name="content" rules={[{ required: true }]}>
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item shouldUpdate>
          {() => (
            <CreateButton
              type="primary"
              htmlType="submit"
              loading={isUploading}
              disabled={
                isUploading ||
                !form.isFieldsTouched(true) ||
                form.getFieldsError().some(({ errors }) => errors.length)
              }
            >
              Create
            </CreateButton>
          )}
        </Form.Item>
      </Form>
    </CreatePostCard>
  );
};

export default CreatePost;
