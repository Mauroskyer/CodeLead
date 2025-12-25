import { Modal, Input, Button } from "antd";
import { useState } from "react";
import usePostsStore from "../../../../../store/postsStore.js";
import useLoginStore from "../../../../../store/auth.js";
import React from "react";

const CommentsModal = ({ open, onClose, post }) => {
  const [text, setText] = useState("");
  const addComment = usePostsStore((s) => s.addComment);
  const userName = useLoginStore((s) => s.userName);

  const handleAdd = () => {
    if (!text.trim()) return;

    addComment(post.id, {
      id: crypto.randomUUID(),
      userName,
      content: text,
      createdAt: new Date().toISOString(),
    });

    setText("");
  };

  return (
    <Modal title="Comments" open={open} onCancel={onClose} footer={null}>
      {post.comments.map((c) => (
        <div key={c.id} style={{ marginBottom: 12 }}>
          <strong>@{c.userName}</strong>
          <p>{c.content}</p>
        </div>
      ))}

      <Input.TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment..."
      />

      <Button type="primary" onClick={handleAdd} style={{ marginTop: 8 }}>
        Comment
      </Button>
    </Modal>
  );
};

export default CommentsModal;
