import styled, { keyframes } from "styled-components";
import { Card, Typography, Button } from "antd";

/* 🔥 Animation */
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const PostCardContainer = styled(Card)`
  margin-bottom: 24px;
  border-radius: 8px;
  overflow: hidden;
  background-color: transparent;

  animation: ${fadeInUp} 0.35s ease-out;

  .ant-card-body {
    padding: 0;
  }
`;

export const PostHeader = styled.div`
  background-color: #7695ec;
  padding: 16px;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PostBody = styled.div`
  padding-left: 16px;
  padding-right: 16px;
  background-color: #ffffff;

  border-left: 1px solid #999999;
  border-right: 1px solid #999999;
  border-bottom: 1px solid #999999;

  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

export const PostTitle = styled.h3`
  margin: 0;
  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 22px;
  line-height: 100%;
  color: #ffffff;
`;

export const UserName = styled(Typography.Text)`
  display: block;
  padding-top: 24px;
  padding-bottom: 16px;

  color: #777777;
  font-family: "Roboto", sans-serif;
  font-size: 14px;
`;

export const PostActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const StyledButton = styled(Button)`
  && {
    background-color: #7695ec;
    border-color: #7695ec;
    color: #ffffff;
    box-shadow: none;
  }

  &&.ant-btn:hover,
  &&.ant-btn:focus,
  &&.ant-btn:active {
    background-color: #7695ec;
    border-color: #7695ec;
    color: #ffffff;
    box-shadow: none;
  }

  svg {
    color: #ffffff;
    transition: transform 0.2s ease, filter 0.2s ease;
  }

  &&.ant-btn:hover svg {
    filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.9));
    transform: scale(1.1);
  }
`;
