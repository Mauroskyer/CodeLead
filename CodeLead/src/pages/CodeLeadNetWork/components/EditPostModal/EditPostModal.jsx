import { Modal, Form, Button } from "antd";
import { StyledSaveButton, StyledCancelButton } from "./styles/EditPostModalStyles.jsx";
import EditForm from "./components/EditForm/EditForm.jsx";
import usePostsStore from "../../../../store/postsStore";

const EditPostModal = ({ open, onClose, post }) => {
  const [form] = Form.useForm();
  const { updatePost, isLoading } = usePostsStore();

  const handleFinish = async (values) => {
    await updatePost(post.id, values);
    onClose();
  };

  return (
    <Modal
      title="Edit Post"
      centered
      open={open}
      closable={!isLoading}
      destroyOnClose
      onCancel={onClose}
      footer={[
        <StyledCancelButton
          key="cancel"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </StyledCancelButton>,
        <StyledSaveButton
          key="save"
          type="primary"
          loading={isLoading}
          onClick={() => form.submit()}
        >
          Save
        </StyledSaveButton>,
      ]}
    >
      <EditForm
        form={form}
        initialValues={{
          title: post.title,
          content: post.content,
        }}
        onFinish={handleFinish}
      />
    </Modal>
  );
};

export default EditPostModal;