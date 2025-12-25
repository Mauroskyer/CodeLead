import React from "react";
import { LogoutOutlined } from "@ant-design/icons";
import useLoginStore from "../../../../store/auth";
import {
  StyledHeader,
  HeaderTitle,
  LogoutButton,
} from "./styles/HeaderCodeLeadNetWorkStyles";

const HeaderCodeLeadNetWork = () => {
  const logout = useLoginStore((s) => s.logout);

  return (
    <StyledHeader>
      <HeaderTitle>CodeLeap Network</HeaderTitle>

      <LogoutButton onClick={logout}>
        <LogoutOutlined />
      </LogoutButton>
    </StyledHeader>
  );
};

export default HeaderCodeLeadNetWork;
