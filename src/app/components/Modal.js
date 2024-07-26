import { Box, Modal, Typography } from "@mui/material";
import styles from "../styles/modal.module.css";
import { CustomButton } from "./Button";

export const CustomModal = ({ text, open, close, onCancel, onAction }) => {
  return (
    <Modal
      open={open}
      onClose={close}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.modal}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {text}
        </Typography>
        <div className={styles.wrapper}>
          <CustomButton
            onClick={onCancel}
            text={"Cancel"}
            color={"secondary"}
          />
          <CustomButton onClick={onAction} text={"Delete"} />
        </div>
      </Box>
    </Modal>
  );
};
