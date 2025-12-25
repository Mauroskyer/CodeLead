import styled from "styled-components";
import { Button } from "antd";

export const StyledSaveButton = styled(Button)`
  width: 120px;
  height: 32px;
  border-radius: 8px;
  background-color: #3fa955;
  border: none;
  opacity: 1;


  &&.ant-btn:hover {
    background-color: #47B960;
  }

  &:disabled {
    background-color: #a5d9b5;
    color: #fff;
  }
`;


export const StyledCancelButton = styled(Button)`
  width: 120px;
  height: 32px;
  border-radius: 8px;
  background-color: white;
  border: 1px solid black; 
  opacity: 1;


  &&.ant-btn:hover {
    border-color: #eb2f28ff;
    color: #eb2f28ff
  }

  &:disabled {
    background-color: #a5d9b5;
    color: #fff;
  }
`;