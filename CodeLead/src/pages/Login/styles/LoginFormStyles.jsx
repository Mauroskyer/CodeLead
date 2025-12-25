import styled from "styled-components";
import { Button } from "antd";

export const StyledEnterButton = styled(Button)`
  width: 111px;
  height: 32px;

  background-color: #7695ec;
  border-color: #7695ec;

  font-family: "Roboto", sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 32px;
  letter-spacing: 0;

  &:hover,
  &:focus {
    background-color: #7695ec;
    border-color: #7695ec;
  }
`;
