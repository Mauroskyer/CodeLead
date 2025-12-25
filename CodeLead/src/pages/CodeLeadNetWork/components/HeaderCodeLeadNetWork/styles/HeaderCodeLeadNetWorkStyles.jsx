import styled from "styled-components";
import { Layout } from "antd";

export const StyledHeader = styled(Layout.Header)`
  width: 100%;
  background-color: #7695ec;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: Roboto, sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: #ffffff;
`;

export const HeaderTitle = styled.span`
  color: #ffffff;
`;

export const LogoutButton = styled.button`
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }
`;
