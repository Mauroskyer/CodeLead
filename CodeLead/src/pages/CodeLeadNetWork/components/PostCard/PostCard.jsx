import { Typography, Modal } from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  HeartOutlined,
  HeartFilled,
  MessageOutlined,
} from "@ant-design/icons";
import {
  PostCardContainer,
  PostHeader,
  PostTitle,
  PostBody,
  UserName,
  PostActions,
  StyledButton,
} from "./styles/PostCardStyles.jsx";
import { useState } from "react";
import React from "react";
import usePostsStore from "../../../../store/postsStore";
import EditPostModal from "../EditPostModal/EditPostModal.jsx";
import CommentsModal from "./components/CommentsModal.jsx";

const PostCard = ({ post, currentUser }) => {
  const removePost = usePostsStore((s) => s.removePost);
  const toggleLike = usePostsStore((s) => s.toggleLike);

  const likes = post.likes ?? 0;
  const likedBy = post.likedBy ?? [];
  const comments = post.comments ?? [];

  const hasLiked = likedBy.includes(currentUser);
  const isOwner = post.username === currentUser;

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);

  const confirmDelete = () => {
    Modal.confirm({
      icon: null,
      title: "Delete this post?",
      content: "Are you sure you want to delete this post?",
      okButtonProps: { danger: true },
      okText: "Delete",
      onOk: () => removePost(post.id),
    });
  };

  return (
    <>
      <PostCardContainer>
        <PostHeader>
          <PostTitle>{post.title}</PostTitle>

          <PostActions>
            {isOwner && (
              <StyledButton
                size="small"
                icon={<DeleteOutlined />}
                onClick={confirmDelete}
              />
            )}

            {isOwner && (
              <StyledButton
                size="small"
                icon={<EditOutlined />}
                onClick={() => setIsEditOpen(true)}
              />
            )}

            <StyledButton
              size="small"
              icon={hasLiked ? <HeartFilled /> : <HeartOutlined />}
              onClick={() => toggleLike(post.id, currentUser)}
            />
            <span>{likes}</span>

            <StyledButton
              size="small"
              icon={<MessageOutlined />}
              onClick={() => setIsCommentsOpen(true)}
            />
            <span>{comments.length}</span>
          </PostActions>
        </PostHeader>

        <PostBody>
          <UserName>@{post.username}</UserName>
          <Typography.Paragraph>{post.content}</Typography.Paragraph>
        </PostBody>
      </PostCardContainer>

      {isEditOpen && (
        <EditPostModal
          open={isEditOpen}
          post={post}
          onClose={() => setIsEditOpen(false)}
        />
      )}

      {isCommentsOpen && (
        <CommentsModal
          open={isCommentsOpen}
          post={post}
          onClose={() => setIsCommentsOpen(false)}
        />
      )}
    </>
  );
};

export default PostCard;
