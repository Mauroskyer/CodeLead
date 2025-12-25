import { Modal, Form, Button, Divider } from "antd";
import { useNavigate } from "react-router";
import { StyledEnterButton } from "./styles/LoginFormStyles.jsx";
import LoginForm from "./components/LoginForm/LoginForm";
import useLoginStore from "../../store/auth.js";
import React from "react";

const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const {
    signup,
    loginWithGoogle,
    isLoading,
    clearError,
  } = useLoginStore();

  const onFinish = ({ UserName }) => {
    clearError();
    signup(UserName);
    navigate("/codeleadnetwork");
  };

  const handleGoogleLogin = async () => {
    clearError();
    await loginWithGoogle();
    navigate("/codeleadnetwork");
  };

  return (
    <Modal
      title="Welcome to CodeLeap network!"
      centered
      closable={false}
      open
      footer={[
        <StyledEnterButton
          key="enter"
          type="primary"
          loading={isLoading}
          onClick={() => form.submit()}
        >
          ENTER
        </StyledEnterButton>,
      ]}
    >
      {/* Login clásico */}
      <LoginForm form={form} onFinish={onFinish} />

      <Divider plain>or</Divider>

      {/* Login con Google */}
      <Button
        block
        loading={isLoading}
        onClick={handleGoogleLogin}
      >
        Sign in with Google
      </Button>
    </Modal>
  );
};

export default Login;
