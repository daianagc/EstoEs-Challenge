import styles from "../styles/subheader.module.css";
import AddIcon from "@mui/icons-material/Add";

export const CustomButton = ({ text, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      <AddIcon className={styles.addIcon} />
      <span className={styles.buttonText}>{text}</span>
    </button>
  );
};
