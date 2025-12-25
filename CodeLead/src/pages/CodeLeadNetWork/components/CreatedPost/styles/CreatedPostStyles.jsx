import styled from "styled-components";
import { Card, Button } from "antd";

export const CreatePostCard = styled(Card)`
    margin-bottom: 16px;
    border: 1px solid #999999;    
    border-radius: 8px;
    .ant-card-body {
    padding: 16px;
    }
    .ant-card-head {
    border-bottom: 1px solid white;
    }
`;

export const CreateButton = styled(Button)`
    width: 111px;
    height: 32px;
    background-color: #7695ec;
    border-color: #7695ec;
    font-family: "Roboto", sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 32px;
    &:hover,
    &:focus {
    background-color: #7695ec;
    border-color: #7695ec;
    }
`;